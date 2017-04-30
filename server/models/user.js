const mongoose = require('mongoose');
const Question = require('./question');
const UserSchema = mongoose.Schema({
    googleId: {type: Number, required: true},
    accessToken: {type: String, required: true},
    questionSet: {type: Array},
    scores: {type: Array}
});

UserSchema.methods.populateQuestions = function() {
    return Question.find();
};

const User = mongoose.model('User', UserSchema);



module.exports = User;
