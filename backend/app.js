import express from 'express';
import config from './config/config';

const app = express();

console.log('config:', config);
const port = config.app.port;

app.get('/ping', (req, res) => res.send('pong'));

app.listen(port, () => {
  console.log('Running on port:', port);
});
