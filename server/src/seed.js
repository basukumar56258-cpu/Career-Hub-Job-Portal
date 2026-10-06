import bcrypt from 'bcryptjs';
import Job from './models/Job.js';
import User from './models/User.js';

const demoJobs = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Nexa Labs',
    location: 'Remote India',
    type: 'Full-time',
    experience: '5+ years',
    salary: '₹18-25 LPA',
    skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
    description: 'Build scalable customer-facing products and lead engineering quality across the platform.',
  },
  {
    title: 'Product Designer',
    company: 'Northstar Design',
    location: 'Bengaluru, India',
    type: 'Contract',
    experience: '3-5 years',
    salary: '₹12-18 LPA',
    skills: ['Figma', 'UX Research', 'Design Systems'],
    description: 'Create polished product experiences and collaborate closely with engineering teams.',
  },
  {
    title: 'Data Analyst',
    company: 'Brightline',
    location: 'Hybrid, Pune',
    type: 'Full-time',
    experience: '2-4 years',
    salary: '₹10-15 LPA',
    skills: ['Python', 'SQL', 'Power BI'],
    description: 'Turn business data into clear insights and help teams make informed decisions.',
  },
];

export async function seedDevelopmentData() {
  if (process.env.NODE_ENV === 'production') return;
  const existing = await Job.countDocuments();
  if (existing > 0) return;

  const recruiter = await User.create({
    name: 'CareerHub Recruiter',
    email: 'recruiter@careerhub.local',
    password: await bcrypt.hash('recruiter123', 12),
    role: 'recruiter',
    company: 'CareerHub Demo',
  });

  await Job.insertMany(demoJobs.map((job) => ({ ...job, recruiter: recruiter._id })));
  console.log('Seeded 3 demo jobs and a recruiter account');
}
