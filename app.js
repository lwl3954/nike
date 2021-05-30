var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var session = require('express-session');
var bodyParser=require("body-parser");
const cors=require("cors");
var db = require("./util/configDb");
var crypto = require('crypto');
var app = express();

var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var ltemRouter = require('./routes/ltem');
var shoppingRouter = require('./routes/shopping');
var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var carRouter = require('./routes/car');
var houtaiRouter = require('./routes/houtai');
var updateRouter = require('./routes/update');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("123"));
app.use(session({
  secret:"123",
  cookie:{maxAge:60000}
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register',registerRouter);
app.use('/ltem', ltemRouter);
app.use('/shopping', shoppingRouter);
app.use('/car',carRouter);
app.use('/houtai',houtaiRouter);
app.use('/update',updateRouter);



//登录注册
app.use(bodyParser.urlencoded({
  extended:true
}))
app.use(bodyParser.json())
app.use(cors())
app.use("/static",express.static(path.join(__dirname,"./views")))
//登录验证
app.post("/login",(req,res)=>{
  console.log("服务端",req.body)
  // const {account,pwd}=req.body;
  var account = req.body.account;
  var pwd = req.body.pwd;
  var md5 = crypto.createHash('md5');
  var newpwd = md5.update(pwd).digest('hex');
  
  let sql=`select * from tab_user where account=${account} and pwd='${newpwd}'`
  console.log("sql",sql)
  let sqlObj=[]
  console.log("sqlObj",sqlObj)
  let callBack=function(err,data){
      // console.log("data:")
      if(err){
        console.log(err)
          console.log("失败")
          return
      }
      if(data.length!=1){
      console.log("密码或用户名出错")
      res.send({
          msg:"用户名或密码出错",
          code:400
      })
      return
      }
      res.send({
          msg:"成功登录",
          code:200
      })
  }
  db.dbConn(sql,sqlObj,callBack)   
})

//注册验证及注册
app.post("/reg",(req,res)=>{
  const account=req.body.account;
  console.log(account)
  const pwd=req.body.pwd;
  var md5 = crypto.createHash('md5');
  var newpwd = md5.update(pwd).digest('hex');
  console.log(newpwd)
  const name=req.body.name;
  console.log(name)
  const phone=req.body.phone;
  console.log(phone)
  let sql="select * from tab_user where account=?"
  let sqlArr=[account]
  let callBack=(err,data1)=>{
      if(err){
          console.log(err)
          return;
      }
      console.log("wishing数据",data1)
      if (data1.length>=1){//测试查找的数据的长度，如果大于0就代表数据库中存在这个用户
          res.send({
              code:400,
              msg:"该用户已存在",
              affectedRows:data1.affectedRows
          })
          return;
      }else{
          let sql ="insert into tab_user set account=?,pwd=?,name=?,phone=?";
          let sqlArr=[account,newpwd,name,phone]
          let callBack=(err,data)=>{
              if(err){
                  console.log(err)
                  return;
              }
              res.send({
                  code:200,
                  msg:"注册成功",
                  affectedRows:data.affectedRows
              })
              return;
          }
          db.dbConn(sql,sqlArr,callBack)
      }
  }
  db.dbConn(sql,sqlArr,callBack)
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
