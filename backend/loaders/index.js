import mongooseLoader from './mongooseLoader';
import expressLoader from './expressLoader';

export default async ({ expressApp }) => {
  await mongooseLoader();
  await expressLoader({ app: expressApp });
};
