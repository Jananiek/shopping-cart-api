
import { UserService } from "../../modules/user/services";
import { matchPassword } from "../../utils/helper";

const LocalStrategy = require('passport-local');
const userService = new UserService();



module.exports = (passport) => {
    passport.use(
        "local-signup",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async (email, password, done) => {
                try {
                    const userExists = await userService.emailExists(email)

                    if (userExists) {
                        return done(null, false);
                    }

                    const user = await userService.createUser({ email, password, mobile: '123456789' });
                    return done(null, user);
                } catch (error) {
                    done(error);
                }
            }
        )
    );

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
                    if (!user) return done(null, false);
                    const isMatch = await matchPassword(password, user.password);
                    if (!isMatch) return done(null, false);
                    return done(null, { id: user.id, email: user.email });
                } catch (error) {
                    return done(error, false);
                }
            }
        )
    );
}