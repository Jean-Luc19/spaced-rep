const express = require('express');
const router = express.Router();
const passportGoogle = require('../auth/google');
const User = require('../models/user');
const Question = require('../models/question')

router.get('/api/auth/google',
    passportGoogle.authenticate('google', {scope: ['profile']}));

router.get('/api/auth/google/callback',
    passportGoogle.authenticate('google', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        res.cookie('accessToken', req.user.accessToken, {expires: 0});
        res.redirect('/');
    }
);

router.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

router.get('/api/me',
    passportGoogle.authenticate('bearer', {session: false}),
    (req, res) => res.json({
        googleId: req.user.googleId
    })
);

router.get('/api/questions',
    passportGoogle.authenticate('bearer', {session: false}),
    (req, res) => res.json(['Question 1', 'Question 2'])
);

/////////////////////////////

router.post('/api/question', (req, res) => {
    const {wordDothraki, wordEnglish, difficulty} = req.body;

    Question.create({
        wordDothraki,
        wordEnglish,
        difficulty
    })
    .then(response => {
        res.json(response)
    })

    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'server error'});
    })
});

router.get('/api/getQuestion', (req, res) => {
    const token = req.headers.authroization
    User.findOne({accessToken: token})
    .exec()
    .then((user) => {
        // we organize questions based off of memory status;
        // return a question.
        // pick a number based off of memory status:
        res.json(user.questionSet[0])
    })
});

module.exports = router;
