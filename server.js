const express = require("express");
const bodyParser=require('body-parser');
const app = express();
const mongoose=require('mongoose');
const passport=require('passport');
const users=require('./routes/api/users');
const profiles=require('./routes/api/profiles')
// DB config
const db=require('./config/key').mongoURI;
// Connect
mongoose.connect(db,{useNewUrlParser: true ,useUnifiedTopology: true })
.then(()=>console.log('MongoDb Connected'))
.catch(err=>console.log(err))
// 使用bodyparser的中间件 必须在connet后面 我也不知道为什么
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// passport初始化
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users',users);
app.use('/api/profiles',profiles);
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Sucess on port ${port}`);
})