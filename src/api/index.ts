import { Router } from 'express';
import health from './routes/health';
import auth from './routes/auth';
import product from './routes/product';

export default () => {
  const app = Router();
  health(app);
  auth(app);
  product(app);

  return app;
};
