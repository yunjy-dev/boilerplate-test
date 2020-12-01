const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:       { type: String, maxlength:255},
    lastname:   { type: String, maxlength:255},
    email:      { type: String, maxlength:255, trim: true, unique: 1},
    password:   { type: String, maxlength:255, minlength:5},
    role:       { type: Number, default: 0},
    image:      String,
    token:      { type: String},
    tokenExp:   { type: Number}
})

const User = mongoose.model('User', userSchema);

module.exports = {User};