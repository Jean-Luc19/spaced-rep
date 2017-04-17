const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    wordDothraki: { type: String, required: true },
    wordEnglish: { type: String, required: true },
    difficulty: { type: Number, required: true },
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
