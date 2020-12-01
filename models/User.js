const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
    

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
    } else{
        next();
    }//end of else

})

//planePassword 12345, securedPassword !#%^#$&^&$%^&#%&%^
    //planePassword를 암호화 하여 비교
userSchema.methods.comparePassword = function(planePassword, cb) {
    bcrypt.compare(planePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
}

userSchema.methods.generateToken = function(cb) {
    var user = this
    //jsonwebtoken 이용해서 
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user);
    });
}


const User = mongoose.model('User', userSchema);

module.exports = {User};