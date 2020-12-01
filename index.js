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

//application/x-www-form-urlencoded
const {User} =  require('./models/User');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());


app.get('/', (req,res) => res.send('Hello World!~'));

app.post('/register', (req,res) => {//endpoint && callback function
    // 회원가입시 필요한 정보를 client로 받아 DB에 저장
    // usermodel 사용 by const {User}

    const user = new User(req.body); //instance 생성
    //by body-parser, req.body는 json format으로 변환
    user.save( (err,userInfro) => {   //DB에 저장하고, callback function
        if(err) return res.json({success: false, err}); // err가 있으면
        return res.status(200).json({success: true}); //err가 없으면
    });


}); 

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
