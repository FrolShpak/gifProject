import mongooseLoader from './mongooseLoader';
import expressLoader from './expressLoader';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  console.log('MongoDB Initialized');

  await expressLoader({ app: expressApp });
  console.log('Express Initialized');
};
