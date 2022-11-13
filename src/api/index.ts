import { Router } from 'express';
import health from './routes/health';
import auth from './routes/auth';

export default () => {
  const app = Router();
  health(app);
  auth(app);

  return app;
};
