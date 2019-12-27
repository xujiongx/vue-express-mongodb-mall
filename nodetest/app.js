const express=require('express')
const app=express()


var goodsData=require('../mock/goods.json')
app.get('/api/goods',(req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.json(goodsData);
})

app.listen(3000,()=>console.log("test serve is running"))