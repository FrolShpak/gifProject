import express from 'express';
import gifProjectRouter from '../api/gifProjectRouter';

export default async ({ app }) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/ping', (req, res) => res.send('pong'));
  app.use('/api', gifProjectRouter);
};
