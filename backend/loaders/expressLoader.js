import express from 'express';

export default async ({ app }) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/ping', (req, res) => res.send('pong'));
  return app;
};
