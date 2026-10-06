import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { createApp } from '../src/app.js';

let mongoServer;
let app;
let candidateToken;
let candidateEmail;
let recruiterToken;
let recruiterId;
let jobId;

process.env.JWT_SECRET = 'careerhub-integration-test-secret';
process.env.ALLOW_RECRUITER_REGISTRATION = 'true';

async function register(role, company = '') {
  const response = await request(app)
    .post('/api/auth/register')
    .send({
      name: role === 'recruiter' ? 'Recruiter Test' : 'Candidate Test',
      email: `${role}-${Date.now()}-${Math.random()}@example.com`,
      password: 'password123',
      role,
      company,
    });
  assert.equal(response.status, 201);
  return response.body;
}

test.before(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  app = createApp();
});

test.after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test('health endpoint reports the API service', async () => {
  const response = await request(app).get('/api/health');
  assert.equal(response.status, 200);
  assert.equal(response.body.status, 'ok');
});

test('candidate registration, login, protected access, and logout work', async () => {
  const registered = await register('candidate');
  assert.ok(registered.token);
  candidateEmail = registered.user.email;
  const login = await request(app).post('/api/auth/login').send({
    email: candidateEmail,
    password: 'password123',
  });
  assert.equal(login.status, 200);
  candidateToken = login.body.token;
  const applications = await request(app)
    .get('/api/applications/candidate/mine')
    .set('Authorization', `Bearer ${candidateToken}`);
  assert.equal(applications.status, 200);
  assert.deepEqual(applications.body, []);

  const logout = await request(app)
    .post('/api/auth/logout')
    .set('Authorization', `Bearer ${candidateToken}`);
  assert.equal(logout.status, 200);

  const afterLogout = await request(app)
    .get('/api/applications/candidate/mine')
    .set('Authorization', `Bearer ${candidateToken}`);
  assert.equal(afterLogout.status, 401);
});

test('recruiter registration is opt-in and recruiter can post a job', async () => {
  process.env.ALLOW_RECRUITER_REGISTRATION = 'false';
  const denied = await request(app).post('/api/auth/register').send({
    name: 'Blocked Recruiter',
    email: 'blocked@example.com',
    password: 'password123',
    role: 'recruiter',
  });
  assert.equal(denied.status, 403);
  process.env.ALLOW_RECRUITER_REGISTRATION = 'true';

  const candidateLogin = await request(app).post('/api/auth/login').send({
    email: candidateEmail,
    password: 'password123',
  });
  assert.equal(candidateLogin.status, 200);
  candidateToken = candidateLogin.body.token;

  const registered = await register('recruiter', 'CareerHub Test');
  recruiterToken = registered.token;
  recruiterId = registered.user.id;
  const created = await request(app)
    .post('/api/jobs')
    .set('Authorization', `Bearer ${recruiterToken}`)
    .send({
      title: 'Frontend Engineer',
      company: 'CareerHub Test',
      location: 'Remote',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '₹8-12 LPA',
      skills: ['React', 'Node.js'],
      description: 'Build reliable web products with modern JavaScript.',
    });
  assert.equal(created.status, 201);
  jobId = created.body._id;

  const recruiterJobs = await request(app)
    .get('/api/jobs/recruiter/mine')
    .set('Authorization', `Bearer ${recruiterToken}`);
  assert.equal(recruiterJobs.status, 200);
  assert.equal(recruiterJobs.body.length, 1);

  const applied = await request(app)
    .post(`/api/applications/${jobId}`)
    .set('Authorization', `Bearer ${candidateToken}`)
    .send({ resumeUrl: 'https://example.com/resume.pdf' });
  assert.equal(applied.status, 201);

  const duplicate = await request(app)
    .post(`/api/applications/${jobId}`)
    .set('Authorization', `Bearer ${candidateToken}`);
  assert.equal(duplicate.status, 409);
});

test('recruiter can update an application and candidate cannot bypass role checks', async () => {
  const applications = await request(app)
    .get('/api/applications/recruiter/mine')
    .set('Authorization', `Bearer ${recruiterToken}`);
  assert.equal(applications.status, 200);
  assert.equal(applications.body.length, 1);

  const updated = await request(app)
    .patch(`/api/applications/${applications.body[0]._id}/status`)
    .set('Authorization', `Bearer ${recruiterToken}`)
    .send({ status: 'Shortlisted' });
  assert.equal(updated.status, 200);
  assert.equal(updated.body.status, 'Shortlisted');

  const forbidden = await request(app)
    .post('/api/jobs')
    .set('Authorization', `Bearer ${candidateToken}`)
    .send({
      title: 'Forbidden',
      company: 'CareerHub Test',
      location: 'Remote',
      description: 'This candidate must not create jobs.',
    });
  assert.equal(forbidden.status, 403);
});
