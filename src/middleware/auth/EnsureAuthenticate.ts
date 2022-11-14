import { NextFunction, Request, Response } from 'express';
import passport from 'passport'
import { ErrorResponse } from '../errorManager/responseHandler';
require("./passportConfig")(passport);

/**
 * @desc Make user authenticated users have access the each request
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export const ensureAuthenticate = function (req:Request, res: Response, next:NextFunction) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            return ErrorResponse(res, { message: `${info?.message ? info.message : "Unauthorized"}` });
        }
        req.headers['userId'] = user.userId
        next()

    })(req, res)

}