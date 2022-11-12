import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api';

export default ({ app }: { app: express.Application }) => {
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  app.use(express.json({ limit: '2mb' }));

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json({ limit: '2mb' }));

  // Load API routes
  app.use(routes());
};
