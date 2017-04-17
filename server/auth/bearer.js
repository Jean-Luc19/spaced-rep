// const passport = require('passport');
// const BearerStrategy = require('passport-http-bearer').Strategy;
// const User = require('../models/user');
// const Question = require('../models/question');
//
// const database = {
//     DATABASE_URL: global.secret.DATABASE_URL
// };
//
// passport.use(
//     new BearerStrategy(
//         (token, done) => {
//             // Job 3: Update this callback to try to find a user with a
//             // matching access token.  If they exist, let em in, if not,
//             // don't.
//             if (!(token in database)) {
//                 return done(null, false);
//             }
//             return done(null, database[token]);
//         }
//     )
// );
