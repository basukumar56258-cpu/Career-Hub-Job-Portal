import dotenv from 'dotenv';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { seedDevelopmentData } from './seed.js';

dotenv.config({ path: new URL('../.env', import.meta.url) });
const port = Number(process.env.PORT || 5000);
const app = createApp();

connectDB()
  .then(seedDevelopmentData)
  .then(() => app.listen(port, () => {
    console.log(`CareerHub API running on http://localhost:${port}`);
  }))
  .catch((error) => {
    console.error('Startup failed:', error.message);
    process.exit(1);
  });
