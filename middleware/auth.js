const { User } = require('../models/User');

let auth = (req, res, next) => {

    //1. get token from client

    //2. decode token and find user

    //3. if user exists, auth ok

    //4. else, auth failed

    let token = req.cookies.x_auth;

    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true});

        req.token = token;
        req.user = user;
        next(); //escape from middleware auth
    })
}


module.exports = {auth};