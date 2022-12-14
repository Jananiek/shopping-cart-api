import { Router, Request, Response } from 'express';
import Joi from 'joi';
import logger, { modules } from '../../loaders/logger/index';
import { ProductService } from '../../modules/products/services';
import { ErrorResponse, SuccessResponse } from '../../utils/responseHandler';
import { ensureAuthenticate } from '../../middleware/auth/EnsureAuthenticate';
const route = Router();
const productService = new ProductService()


export default (app: Router): void => {
    app.use('/products', route);
/**
 * Get All Products
 */
    route.get('/', async (req: Request, res: Response) => {
        try {
            const { query } = req;
            const products = await productService.getAll({ ...query });
            return SuccessResponse(res, products, null, 200);
        } catch (e) {
            logger.error('Get products', {
                module: modules.product,
                service: 'products',
                data: e.message,
            });
            return ErrorResponse(res, { message: e.message }, 500);
        }
    });
    /**
     * Add product rate by login user
     */
    route.post('/:id/rate/:rate', ensureAuthenticate, async (req: Request, res: Response) => {
        try {
            const { params: { id, rate },headers } = req;
            const userId = headers.userId ? headers.userId : undefined
            const schema = Joi.object().keys({
                productId: Joi.number().required(),
                userId: Joi.number().required(),
                userRating: Joi.number().required(),

            })
            const validateProductInput = await schema.validateAsync({ productId: id,userId, userRating: rate });
            const result = await productService.addProductRating(validateProductInput);
            return SuccessResponse(res, result, null, 201);
        } catch (e) {
            logger.error('Add product rating', {
                module: modules.product,
                service: 'products',
                data: e.message,
            });
            return ErrorResponse(res, { message: e.message }, 500);
        }
    });

    /**
     * Create Product
     */
    route.post('/', async (req: Request, res: Response) => {
        try {
            const { body } = req;
            const schema = Joi.object().keys({
                productCode: Joi.string().required(),
                productName: Joi.string().required(),
                price: Joi.number().min(0).required(),
                averageRating: Joi.number().default(0),
                discount: Joi.number().default(0)

            })
            const validateProductInput = await schema.validateAsync(body);
            const result = await productService.createOne(validateProductInput);
            return SuccessResponse(res, result, null, 201);
        } catch (e) {
            logger.error('Create new product', {
                module: modules.product,
                service: 'products',
                data: e.message,
            });
            return ErrorResponse(res, { message: e.message }, 500);
        }
    });
};
