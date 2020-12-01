const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
//const {mongoURI} = require('./config/dev');
const config = require('./config/key');

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
})
.then(()=>{console.log('MongoDB connected...')})
.catch(err=> console.log(err));

const { User } =  require('./models/User');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { auth } = require('./middleware/auth');


const { response } = require('express');
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/', (req,res) => res.send('Hello World!~'));

app.post('/api/users/register', (req,res) => {//endpoint && callback function
    // 회원가입시 필요한 정보를 client로 받아 DB에 저장
    // usermodel 사용 by const {User}
    const user = new User(req.body); //instance 생성
    //by body-parser, req.body는 json format으로 변환
    user.save( (err,userInfro) => {   //DB에 저장하고, callback function
        if(err) return res.json({success: false, err}); // err가 있으면
        return res.status(200).json({success: true}); //err가 없으면
    });
}); 

app.post('/login', (req,res) => {
    //이메일을 DB에서 찾기
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "No user founded."
            })
        } 
        //있다면 비밀번호 체크
        //비밀번호 같다면, Token 생성
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({ loginSuccess:false, message: "wrong password."});
            
            user.generateToken((err, user) => {
                if(err) return response.status(400).send(err);
                //token을 cookie or local storage에 저장
                res.cookie("x_auth", user.token).status(200).json({ loginSuccess:true, userId: user._id});
            });
        });  
    });
});

app.get('/api/users/auth', auth, (req,res) =>{
    //if be here, then the auth is true
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0? false:true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image

    })
});

app.get('/api/users/logout', auth, (req, res) =>{
    User.findOneAndUpdate({_id: req.user._id}, {token:""}, (err, user) => {
        if (err) return res.json({success:false, err});
        return res.status(200).send({sucess:true});
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
