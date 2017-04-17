const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/user');
const Question = require('../models/question');

const database = {
    DATABASE_URL: global.secret.DATABASE_URL
};

passport.use(
    new GoogleStrategy({
        clientID:  global.secret.CLIENT_ID,
        clientSecret: global.secret.CLIENT_SECRET,
        callbackURL: `/api/auth/google/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
        // Job 1: Set up Mongo/Mongoose, create a User model which store the
        // google id, and the access token
        // Job 2: Update this callback to either update or create the user
        // so it contains the correct access token
        const user = database[accessToken] = {
            googleId: profile.id,
            accessToken: accessToken
        };

        const searchQuery = {
            googleId: profile.id
        };

        const updates = {
            name: profile.displayName,
            accessToken: accessToken,
            googleId: profile.id
        };

        const options = {
            upsert: true
        };

        User.findOne(searchQuery)
        .then((user) => {
            if (!user) {
                return Question.find()
            }
        })
        .then((questions) => {
            if (questions) {
                updates['questionSet'] = questions;
                User.create(updates, (err, user) => {
                    console.log(user);
                    if (err) {
                        return cb(err);
                    }
                    else {
                        return cb(null, user);
                    }
                })
            } else {
                User.findOneAndUpdate(searchQuery, updates, (err, user) => {
                    if (err) {
                        return cb(err);
                    }
                    else {
                        return cb(null, user);
                    }
                })
            }
        })
    }
));

passport.use(
    new BearerStrategy(
        (token, done) => {
            // Job 3: Update this callback to try to find a user with a
            // matching access token.  If they exist, let em in, if not,
            // don't.
            if (!(token in database)) {
                return done(null, false);
            }
            return done(null, database[token]);
        }
    )
);

module.exports = passport;
