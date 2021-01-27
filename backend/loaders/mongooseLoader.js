import mongoose from 'mongoose';
import config from '../config';
export default async () => {
  await mongoose.connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Failed to connect to MongoDB:'));
  db.once('open', () => console.log('Successfully connected to MongoDB.'));
};
