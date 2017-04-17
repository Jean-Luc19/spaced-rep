const mongoose = require('mongoose');
const Question = require('./question');

const QuestionSetSchema = mongoose.Schema({
    questions: { type: Array, required: true },
    difficulty: { type: Number, required: true }
});

const QuestionSet = mongoose.model('QuestionSet', QuestionSetSchema);

module.exports = QuestionSet;
