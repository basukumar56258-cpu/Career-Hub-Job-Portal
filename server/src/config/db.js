import mongoose from 'mongoose';

export async function connectDB() {
  let uri = process.env.MONGO_URI;
  if (!uri && process.env.NODE_ENV !== 'production') {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const memoryServer = await MongoMemoryServer.create();
    uri = memoryServer.getUri();
    process.env.MONGO_URI = uri;
    process.once('exit', async () => {
      await mongoose.disconnect();
      await memoryServer.stop();
    });
    console.log('MongoDB development fallback: in-memory database connected');
  }
  if (!uri) throw new Error('MONGO_URI is required in production');
  await mongoose.connect(uri);
  console.log('MongoDB connected');
}
