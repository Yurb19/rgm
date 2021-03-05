const {Strategy, ExtractJwt} = require("passport-jwt");
const User = require('../../models/User.model');
const config = require("../../config/index");

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.secretOrKey;

module.exports = (passport) => {
    passport.use(
        new Strategy(options, async (jwt_payload, done) => {
            try {
                const user = await User.findById(jwt_payload.id, {password: 0})
                if (user && user.status) {
                    // console.log(user)
                    return done(null, user); // * Stores the user in the request
                }
                return done(null, false, {message: 'User not Found'}); 
            } catch (error) {
                console.log(error);
            }
        })
    );
};