const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    googleId: {type: Number, required: true},
    accessToken: {type: String, required: true},
    questionSet: {type: Array}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
