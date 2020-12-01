const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

userSchema.pre('save', function(next){  //pre() from mongoose method

    var user = this;

    if(user.isModified('password')){
    
        //encrypt password by bcrypt
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);

            var myPlaintextPassword = user.password;
            // console.log(myPlaintextPassword)
            bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;
                // Store hash in your password DB.
                console.log(hash);
                next();
            });
        });
    }//end of if
})

const User = mongoose.model('User', userSchema);

module.exports = {User};