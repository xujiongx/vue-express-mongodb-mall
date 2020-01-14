var express = require('express');
var router = express.Router();

const User = require('./../models/user')

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


//登录接口
router.post("/login", function (req,res,next) {
  var param = {
      userName:req.body.userName,
      userPwd:req.body.userPwd
  }
  User.findOne(param, function (err,doc) {
      if(err){
          res.json({
              status:"0",
              msg:err.message
          });
      }else{
          if(doc){
              res.cookie("userId",doc.userId,{
                  path:'/',
                  maxAge:1000*60*60
              });
              res.cookie("userName",doc.userName,{
                path:'/',
                maxAge:1000*60*60
              });
              //req.session.user = doc;
              res.json({
                  status:'1',
                  msg:'',
                  result:{
                      userName:doc.userName
                  }
              });
          }
      }
  });
});

//登出接口
router.post('/logout',(req,res,next)=>{
  res.cookie("userId","",{
    path:'/',
    maxAge:-1
  }),
  res.json({
    status:"1",
    msg:'',
    result:''
  })
})

//检查登录
router.get('/checkLogin',(req,res,next)=>{
  if(req.cookies.userId){
    res.json({
      status:'1',
      msg:'',
      result:req.cookies.userName
    })
  }else{
    res.json({
      status:'0',
      msg:'未登录',
      result:''
    })
  }
})

module.exports = router;
