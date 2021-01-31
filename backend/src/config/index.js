import dotenv from 'dotenv';
import convict from 'convict';

dotenv.config();

const config = convict({
  env: {
    format: ['prod', 'dev', 'test'],
    default: 'dev',
    env: 'NODE_ENV',
    arg: 'nodeEnv',
  },
  app: {
    port: {
      format: 'port',
      default: process.env.PORT,
      env: 'PORT',
    },
  },
  firestore: {
    projectId: {
      format: String,
      default: process.env.PROJECT_ID,
      env: 'PROJECT_ID',
    },
    keyFilename: {
      format: String,
      default: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      env: 'GOOGLE_APPLICATION_CREDENTIALS',
    },
  },
  cloudStorage: {
    bucket: {
      format: String,
      default: process.env.GCLOUD_STORAGE_BUCKET,
      env: 'GCLOUD_STORAGE_BUCKET',
    },
  },
  secret: {
    format: String,
    default: process.env.SECRET,
    env: 'SECRET',
  },
});

const env = config.get('env');
config.loadFile(`./configs/${env}.json`);
config.validate({ allowed: 'strict' });

export default config.getProperties();
