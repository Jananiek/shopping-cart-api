
import { UserService } from "../../modules/user/services";
import { matchPassword } from "../../utils/helper";

const LocalStrategy = require('passport-local');
const passportJWT = require("passport-jwt");
const userService = new UserService();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;



module.exports = (passport) => {
    /**
     * User sign up using passport local strategy
     */
    passport.use(
        "local-signup",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password"
            },
            async (email, password, done) => {
                try {
                    const userExists = await userService.emailExists(email)

                    if (userExists) {
                        return done(null, false, { message: 'User already exists' });
                    }

                    const user = await userService.createUser({ email, password, mobile: '0123456789' });
                    return done(null, user, { message: 'User registered successfully' });
                } catch (error) {
                    done(error);
                }
            }
        )
    );
/**
 * User login using passport local strategy
 */
    passport.use(
        "local-login",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async (email, password, done) => {
                try {
                    const user = await userService.emailExists(email);
                    if (!user) return done(null, false, { message: 'User Not found' });
                    const isMatch = await matchPassword(password, user.password);
                    if (!isMatch) return done(null, false, { message: 'Password does not match' });
                    return done(null, { id: user.id, email: user.email }, { message: 'Logged in Successfully' });
                } catch (error) {
                    return done(error, false);
                }
            }
        )
    );
/**
 * User authenticate using passport jwt strategy
 */
    passport.use(
        "jwt",
        new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'jwt_secret'
        },
            async (jwtPayload, done) => {
                try {
                    if (!jwtPayload) return done(null, false);
                    return done(null, { userId: jwtPayload.id });
                } catch (error) {
                    return done(error, false);
                }
            }
        )
    );
}