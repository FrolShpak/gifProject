import expressLoader from './expressLoader';

export default async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
};
