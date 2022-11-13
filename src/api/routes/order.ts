import { Router, Request, Response } from 'express';
import Joi from 'joi';
import logger, { modules } from '../../loaders/logger/index';
import { OrderService } from '../../modules/orders/services';
import { ErrorResponse, SuccessResponse } from '../../utils/responseHandler';

const route = Router();
const orderService = new OrderService()


export default (app: Router): void => {
    app.use('/orders', route);

    route.post('/', async (req: Request, res: Response) => {
        try {
            const { body } = req;
            const userId = 3 //TODO
            const schema = Joi.object().keys({
                orderNumber: Joi.string().required(),
                orderDate: Joi.string().required(),
                userId: Joi.number().required()

            })
            const validateProductInput = await schema.validateAsync({ ...body, userId });
            const result = await orderService.createOne(validateProductInput);
            return SuccessResponse(res, result, null, 201);
        } catch (e) {
            logger.error('Create new order', {
                module: modules.product,
                service: 'orders',
                data: e.message,
            });
            return ErrorResponse(res, { message: e.message }, 500);
        }
    });
    route.post('/:id/products', async (req: Request, res: Response) => {
      // Can add multiple products from here by calling createOrUpdateOrderProducts()
    });
};
