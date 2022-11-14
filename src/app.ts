import config from './config';

import express from 'express';

import Logger from './loaders/logger';

async function startServer() {
  const app = express();

  await require('./loaders').default({ expressApp: app });
  app
    .listen(config.PORT, () => {
      Logger.info(`
      ###########################################################################
       Server listening on port: ${config.PORT} in ${config.NODE_ENV} environment
      ###########################################################################
    `);
    })
    .on('error', err => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
