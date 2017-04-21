const express = require('express');
const router = express.Router();
const {passport: passportGoogle} = require('../auth/google');
const User = require('../models/user');
const Question = require('../models/question')
const bearer = require('../auth/bearer');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

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
    bearer.authenticate('bearer', {session: false}),
    (req, res) => res.json(['Question 1', 'Question 2'])
);


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


router.get('/api/reset', bearer.authenticate('bearer', {session: false }), (req, res) => {
    const searchQuery = {googleId: req.user.googleId}
    User.find(searchQuery)
    .then((response) => {
        const UpdatedQuestionSet = response[0].questionSet.map((question) => {
            question.memory = 0;
            return question;
        })
        return User.findOneAndUpdate(searchQuery, {$set: {questionSet: UpdatedQuestionSet}}, { new: true })
    })
    .then(user => {
        const scores = user.scores;
        const newScores = scores.map(x => {
            let key = Object.keys(x)
            x[key] = [0,0]
            return x
        })
        return User.findOneAndUpdate({googleId: req.user.googleId}, {$set: {'scores': newScores}}, {new: true})
    })
    .then(response => {
        res.sendStatus(205);
    })
    .catch(err => {
        res.status(500).send(err)
    })
})


router.post('/api/answer', bearer.authenticate('bearer', {session: false}), (req, res) => {
    const questionId = req.body.questionId
    const increment = req.body.answer ? 1 : -1;
    const score = req.body.answer ? 0 : 1;

    const searchQuery = {
        googleId:  req.user.googleId,
        "questionSet._id": mongoose.Types.ObjectId(questionId)
    }


    User.findOneAndUpdate(searchQuery,{$inc: {'questionSet.$.memory': increment}}, {new: true})
    .exec()
    .then(user => {
        const scores = user.scores;
        const newScores = scores.map(x => {
            let key = Object.keys(x)
            if (key[0] === req.body.dothWord) {
                x[key][score]++
            }
            return x
        })
        return User.findOneAndUpdate({googleId: req.user.googleId}, {$set: {'scores': newScores}}, {new: true})
    })
    .then(user => {
        console.log(user.scores);
        const total = [0, 0];
        user.scores.forEach(x => {
            let key = Object.keys(x);
            total[0] += x[key][0]
            total[1] += x[key][1]
        })
        console.log(total)
        return res.json({total: total})
    })
    .catch(err => {
        res.status(500).send(err)
    })

});

router.get('/api/getQuestion', bearer.authenticate('bearer', {session: false}), (req, res) => {
    const id = req.user.googleId;

    User.findOne({googleId: id})
    .then((user) => {
        const questions = user.questionSet
        questions.sort((a,b) => {
            return a.memory - b.memory
        })

        const total = [0, 0];
        user.scores.forEach(x => {
            let key = Object.keys(x);
            total[0] += x[key][0]
            total[1] += x[key][1]
        })

        res.json({question: questions[Math.floor(Math.random() * 3)], scores: total})
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

module.exports = router;
