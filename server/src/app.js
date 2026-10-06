import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import auth from './routes/auth.js';
import jobs from './routes/jobs.js';
import applications from './routes/applications.js';

const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5173',
].flatMap((origin) => origin.split(',')).map((origin) => origin.trim()).filter(Boolean);

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(cors({ origin: allowedOrigins, credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'CareerHub API', time: new Date().toISOString() });
  });
  app.use('/api/auth', auth);
  app.use('/api/jobs', jobs);
  app.use('/api/applications', applications);

  app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
  });

  return app;
}
