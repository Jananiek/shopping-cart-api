import { Router } from 'express';
import health from './routes/health';
import auth from './routes/auth';
import product from './routes/product';
import order from './routes/order';
import swaggerDoc from './routes/swaggerDoc';

export default () => {
  const app = Router();
  swaggerDoc(app);
  health(app);
  auth(app);
  product(app);
  order(app)

  return app;
};
