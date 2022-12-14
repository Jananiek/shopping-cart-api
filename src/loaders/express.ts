import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api';
import config from '../config';
import { errorHandler } from '../middleware/errorManager/errorHandler';

export default ({ app }: { app: express.Application }) => {
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  app.use(express.json({ limit: '2mb' }));

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json({ limit: '2mb' }));

  // Load API routes
  app.use(config.api.prefix, routes());

  //Error handling middleware, delegate the handling to the centralized error handler
  app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
    if (!errorHandler.isTrustedError(err)) {
      next(err);
    }
    await errorHandler.handleError(res, err);
  });
};
