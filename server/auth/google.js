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
            upsert: true,
            new: true
        };

        User.findOne(searchQuery)
        .then((user) => {
            if (!user) {
                return Question.find()
            } else {
                User.findOneAndUpdate(searchQuery, {$set: updates}, options, (err, user) => {
                    if (err) {
                        console.log(err);
                        return cb(err);
                    }
                    else {
                        return cb(null, user);
                    }
                })
            }
        })
        .then((questions) => {
            if (questions) {
                const scores = questions.map(q => {
                    let dothWord = q.wordDothraki;
                    return {
                        word: dothWord,
                        correct: 0,
                        incorrect: 0
                    }

                })

                updates['scores'] = scores;
                updates['questionSet'] = questions;
                User.create(updates, (err, user) => {
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

module.exports = {passport, database};
