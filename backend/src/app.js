import 'regenerator-runtime/runtime.js';
import express from 'express';
import loaders from './loaders';
import config from './config';

async function startServer() {
  console.debug(config);
  const app = express();
  await loaders({ expressApp: app });

  app.listen(config.app.port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Running on port:', config.app.port);
  });
}

startServer();
