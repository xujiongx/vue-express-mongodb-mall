var express = require('express');
var router = express.Router();
const mongoose=require('mongoose')

const Goods=require('../models/goods')

mongoose.connect('mongodb://127.0.0.1:27017/mall',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

mongoose.connection.on("connected",()=>console.log("mongodb connect is success"))

router.get("/",function(req,res,next){
    let {page,pageSize,sort,priceLevel=""}=req.query;
    let {startPrice,endPrice}=priceLevel?JSON.parse(decodeURI(priceLevel)):{};
    let skip=(page-1)*pageSize
    let params=priceLevel?{salePrice:{$gt:startPrice,$lte:endPrice}}:{};
    let goodsModel=Goods.find(params).skip(skip).limit(+pageSize);
    goodsModel.sort({'salePrice':sort})
    goodsModel.exec(function(err,doc){
        if(err){
            res.json({
                status:'0',
                msg: err.message,
            })
        }else{
            res.json({
                status:'1',
                msg:'success',
                result:{
                    count:doc.length,
                    list:doc
                }
            })
        }
    })
})

module.exports=router;