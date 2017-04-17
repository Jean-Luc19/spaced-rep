const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    googleId: {type: Number, required: true},
    accessToken: {type: String, required: true},
    // level: { type: Number, default: 1 },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
