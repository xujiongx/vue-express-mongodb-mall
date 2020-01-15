var express = require('express');
var router = express.Router();

const User = require('./../models/user')

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


//登录接口
router.post("/login", function (req, res, next) {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: "0",
        msg: err.message
      });
    } else {
      if (doc) {
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        //req.session.user = doc;
        res.json({
          status: '1',
          msg: '',
          result: {
            userName: doc.userName
          }
        });
      }
    }
  });
});

//登出接口
router.post('/logout', (req, res, next) => {
  res.cookie("userId", "", {
      path: '/',
      maxAge: -1
    }),
    res.json({
      status: "1",
      msg: '',
      result: ''
    })
})

//检查登录
router.get('/checkLogin', (req, res, next) => {
  if (req.cookies.userId) {
    res.json({
      status: '1',
      msg: '',
      result: req.cookies.userName
    })
  } else {
    res.json({
      status: '0',
      msg: '未登录',
      result: ''
    })
  }
})

//获取用户购物测信息
router.get('/cartList', (req, res, next) => {
  let userId = req.cookies.userId;
  User.findOne({
    userId: userId
  }, (err, doc) => {
    if (err) {
      res.json({
        status: 0,
        message: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: 1,
          message: '',
          result: doc.cartList
        })
      }
    }
  })
})

//删除接口
router.post('/cart/del', (req, res, next) => {
  let userId = req.cookies.userId,
    productId = req.body.productId;
  User.update({
    userId: userId
  }, {
    $pull: {
      'cartList': {
        'productId': productId
      }
    }
  },(err,doc)=>{
    if(err){
      res.json({
        status: 0,
        message: err.message,
        result: ''
      })
    }else{
      if (doc) {
        res.json({
          status: 1,
          message: '',
          result: doc
        })
      }
    }
  })
})

//购物车的全选接口
router.post('/editCheckAll',(req,res,next)=>{
  let userId=req.cookies.userId,
      checkAll=req.body.checkAll?1:0;
  
  User.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status: 0,
        message: err.message,
        result: ''
      })
    }else{
      if (doc) {
        doc.cartList.forEach(item=>{
          item.checked=checkAll;
        })
        doc.save((err1,doc1)=>{
          if(err1){
            res.json({
              status: 0,
              message: err.message,
              result: ''
            })
          }else{
            if (doc1) {
              res.json({
                status: 1,
                message: '',
                result: doc1
              })
            }
          }
        })
      }
    }
  })
})

// //购物车每个商品选择接口,自己写的单独接口，没用上
// router.post('/cart/select',(req,res,next)=>{
//   let userId=req.cookies.userId,
//       productId=req.body.productId,
//       checked=req.body.checked?1:0;
  
//   User.findOne({userId:userId},(err,doc)=>{
//     if(err){
//       res.json({result:err.message})
//     }else{
//      if(doc){
//        doc.cartList.forEach(item=>{
//          if(item.productId==productId){
//            item.checked=checked;
//          }
//        })
//        doc.save((err1,doc1)=>{
//         if(err1){
//           res.json({
//             status: 0,
//             message: err.message,
//             result: ''
//           })
//         }else{
//           if (doc1) {
//             res.json({
//               status: 1,
//               message: '',
//               result: doc1
//             })
//           }
//         }
//       })
//      }
//     }
  
//   })
// })

//修改商品数量
router.post('/cart/changeNum',(req,res,next)=>{
  let userId=req.cookies.userId,
  productId=req.body.productId,
  productNum=req.body.productNum,
  checked=req.body.checked;

  User.update({'userId':userId,'cartList.productId':productId},{
    'cartList.$.productNum':productNum,
    'cartList.$.checked':checked,
  },(err,doc)=>{
    if(err){
      res.json({
        status: 0,
        message: err.message,
        result: ''
      })
    }else{
      res.json({
        status: 1,
        message: '',
        result: doc
      })
    }
  })
})

//查询用户地址接口
router.get('/address/list',(req,res,next)=>{
  let userId=req.cookies.userId;
  User.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status: 0,
        message: err.message,
        result: ''
      })
    }else{
      if(doc){
        res.json({
          status: 1,
          message: '',
          result: doc.addressList
        })
      }
    }
  })
})

//设置默认地址
router.post('/address/setDefault',(req,res,next)=>{
  let userId=req.cookies.userId,
  addressId=req.body.addressId;
  User.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status: 0,
        message: err.message,
        result: ''
      })
    }else{
      doc.addressList.forEach(item=>{
        if(item.addressId==addressId){
          item.isDefault=true;
        }else{
          item.isDefault=false;
        }
      })
      doc.save((err1,doc1)=>{
        if(err1){
          res.json({
            status: 0,
            message: err.message,
            result: ''
          })
        }else{
          if (doc1) {
            res.json({
              status: 1,
              message: '',
              result: '设置默认地址成功'
            })
          }
        }
      })
    }
  })
})

//删除地址
router.post("/address/del",(req,res,next)=>{
  let userId=req.cookies.userId,
  addressId=req.body.addressId;
  User.update({
    userId: userId
  }, {
    $pull: {
      'addressList': {
        'addressId': addressId
      }
    }
  },(err,doc)=>{
    if(err){
      res.json({
        status: 0,
        message: err.message,
        result: ''
      })
    }else{
      if (doc) {
        res.json({
          status: 1,
          message: '',
          result: '删除地址成功'
        })
      }
    }
  })
})

//添加地址
router.post('/address/add',(req,res,next)=>{
  // let  "addressId": "100001",
  // "userName": "JackBean",
  // "streetName": "北京市朝阳区朝阳公园",
  // "postCode": "100001",
  // "tel": "12345678901",
  // "isDefault": false
})

module.exports = router;
