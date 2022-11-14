import { Router, Request, Response } from 'express';
import Joi from 'joi';
import logger, { modules } from '../../loaders/logger/index';
import { ErrorResponse, SuccessResponse } from '../../utils/responseHandler';
import jwt from 'jsonwebtoken'
import passport from 'passport'
require("../../middleware/auth/passportConfig")(passport);

const route = Router();

export default (app: Router): void => {
  app.use('/', route);
  /**
   * User Register
  */
  route.post('/register', function (req: Request, res: Response) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        mobile: Joi.string()
          .length(10)
          .pattern(/^[0-9]+$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required()
      })
      const validateUserInput = schema.validate(req.body);
      if (validateUserInput.error) {
        return ErrorResponse(res, { message: validateUserInput.error.message });
      }
      passport.authenticate("local-signup", { session: false }, (err, user, info) => {
        if (err || !user) {
          return ErrorResponse(res, { message: `${info?.message ? info.message : "Something is not right"}` });
        }
        return SuccessResponse(res, user, `${info?.message ? info.message : "User created"}`, 201);

      })(req, res)
    } catch (error) {
      logger.error('Register User', {
        module: modules.user,
        service: 'users',
        data: error.message,
      });
      return ErrorResponse(res, { message: error.message });
    }
  });
/**
 * Login User
 */
  route.post('/login', function (req: Request, res: Response) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
      })
      const validateUserInput = schema.validate(req.body);
      if (validateUserInput.error) {
        return ErrorResponse(res, { message: validateUserInput.error.message });
      }
      passport.authenticate("local-login", { session: false }, (err, user, info) => {
        if (err || !user) {
          return ErrorResponse(res, { message: `${info?.message ? info.message : "Something is not right"}` });
        }
        // generate a signed json web token with the contents of user object and return it in the response
        const token = jwt.sign(user, 'jwt_secret', { expiresIn: 60 * 60 });
        return SuccessResponse(res, { ...user, token }, `${info?.message ? info.message : "User logged in"}`, 200);

      })(req, res)

    } catch (error) {
      logger.error('Login User', {
        module: modules.user,
        service: 'users',
        data: error.message,
      });
      return ErrorResponse(res, { message: error.message });
    }
  });

};

