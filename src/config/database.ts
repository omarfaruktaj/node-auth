import mongoose from 'mongoose';
import { envConfig } from './env';

const connectDB = async () => {
  try {
    await mongoose.connect(envConfig.MONGODB_URI);

    console.log('MongoDB Connected Successfully');
  } catch (error) {
    if (error instanceof Error) {
      console.error('MongoDb connection error:', error);
    }

    process.exit(1);
  }
};

export default connectDB;
