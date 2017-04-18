const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/user');
const Question = require('../models/question');
const {database} = require('./google');

passport.use(
    new BearerStrategy(
        (token, done) => {
            

            if (!(token in database)) {
                return done(null, false);
            }
            return done(null, database[token]);
        }
    )
);

module.exports = passport;
