const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model("users");
const keys = require('../config/key');
const opts = {
    // jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    // secretOrKey : keys.secretOrKey
}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id).then(user => {
            
            if (user) return done(null, user)
            return done(null, false)
        }).catch(err => console.log(err))
        console.log(jwt_payload)
    }));
}