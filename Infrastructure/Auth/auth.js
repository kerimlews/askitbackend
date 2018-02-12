// Modules 

const serverModule = require('../Middlewares/serverMiddleware');
const sequelizers = require('../DbConnection/index');

// Variables

const passport = serverModule.passport;
const User = sequelizers.userSequelize;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
      opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
      opts.secretOrKey = 'secret';

// Functions 
module.exports = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then((user) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
    }).catch((err) => {
            return done(err, false);
    });
}));


