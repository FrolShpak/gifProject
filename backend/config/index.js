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
      default: 3000,
      env: 'PORT',
    },
  },
  db: {
    url: {
      format: String,
      default: 'mongodb://localhost/gifProject',
      env: 'DB_URl',
    },
  },
  secret: {
    format: String,
    default: process.env.SECRET,
  },
});

const env = config.get('env');
config.loadFile(`./config/${env}.json`);
config.validate({ allowed: 'strict' });

export default config.getProperties();