import passport from 'passport'
import { ErrorResponse } from '../errorManager/responseHandler';
require("./passportConfig")(passport);

export const ensureAuthenticate = function (req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            return ErrorResponse(res, { message: `${info?.message ? info.message : "Unauthorized"}` });
        }
        req.headers['userId'] = user.userId
        next()

    })(req, res)

}