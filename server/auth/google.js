const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const {secret} = require('../index')

const User = require('../models/user');

let secret = {
  CLIENT_ID: '128253236444-g3l2dagjtm70mvc6mfnm7ec1ncddstk6.apps.googleusercontent.com',
  CLIENT_SECRET: 'lsUN_N5FfBOBinxMXTuuKEch'
}

const database = {
    DATABASE_URL: process.env.DATABASE_URL
};

passport.use(
    new GoogleStrategy({
        clientID:  secret.CLIENT_ID,
        clientSecret: secret.CLIENT_SECRET,
        callbackURL: `/api/auth/google/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
        // Job 1: Set up Mongo/Mongoose, create a User model which store the
        // google id, and the access token
        // Job 2: Update this callback to either update or create the user
        // so it contains the correct access token

        const searchQuery = {
            googleId: profile.id
        };

        const user = database[accessToken] = {
            googleId: profile.id,
            accessToken: accessToken
        };

        const updates = {
            name: profile.displayName,
            accessToken: accessToken,
            googleId: profile.id
        };

        const options = {
            upsert: true
        };

        User.findOneAndUpdate(searchQuery, updates, options, (err, user) => {
            if (err) {
                return cb(err);
            }
            else {
                return cb(null, user);
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
