import express from 'express';
import gifProjectRouter from '../api/gifProjectRouter';

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
      ...err,
    },
  });
}

export default async ({ app }) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/ping', (req, res, next) => res.send('pong'));
  app.use('/api', gifProjectRouter);
  app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });
  app.use(errorHandler);
};
