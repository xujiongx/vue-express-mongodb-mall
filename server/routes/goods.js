var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')

const Goods = require('../models/goods')

mongoose.connect('mongodb://127.0.0.1:27017/mall', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => console.log("mongodb connect is success"))


//查询商品列表数据
router.get("/", function (req, res, next) {
    let {
        page,
        pageSize,
        sort,
        priceLevel = ""
    } = req.query;
    let {
        startPrice,
        endPrice
    } = priceLevel ? JSON.parse(decodeURI(priceLevel)) : {};
    let skip = (page - 1) * pageSize
    let params = priceLevel ? {
        salePrice: {
            $gt: startPrice,
            $lte: endPrice
        }
    } : {};
    let goodsModel = Goods.find(params).skip(skip).limit(+pageSize);
    goodsModel.sort({
        'salePrice': sort
    })
    goodsModel.exec(function (err, doc) {
        if (err) {
            res.json({
                status: '0',
                msg: err.message,
            })
        } else {
            res.json({
                status: '1',
                msg: 'success',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
})


//加入到购物车
router.post('/addCart', (req, res, next) => {
    const userId = '100000077'
    const productId = req.body.productId
    const User = require('../models/user')
    //根据userId找到用户
    User.findOne({
        userId: userId
    }, (err, UserDoc) => {
        if (err) {
            res.json({
                status: '0',
                msg: err.message,
            })
        } else {
            if (UserDoc) {
                let goodItem = ''
                UserDoc.cartList.forEach((item) => {
                    if (item.productId == productId) {
                        goodItem = item;
                        item.productNum++;
                    }

                })
                //如果已经有此商品就加1，没有就去找到商品并添加到用户购物车
                if (goodItem) {
                    UserDoc.save((err2, nUserDoc) => {
                        if (err2) {
                            res.json({
                                status: '0',
                                msg: err2.message,
                            })
                        } else {
                            goodItem = '';
                            res.json({
                                status: '1',
                                msg: '',
                                result: 'success'
                            })
                        }
                    })
                } else {
                    Goods.findOne({
                        productId: productId
                    }, (err1, GoodDoc) => {
                        if (err1) {
                            res.json({
                                status: '0',
                                msg: err1.message,
                            })
                        } else {
                            if (GoodDoc) {
                                GoodDoc.productNum = 1;
                                GoodDoc.checked = 1;
                                UserDoc.cartList.push(GoodDoc);
                                UserDoc.save((err2, nUserDoc) => {
                                    if (err2) {
                                        res.json({
                                            status: '0',
                                            msg: err2.message,
                                        })
                                    } else {
                                        res.json({
                                            status: '1',
                                            msg: '',
                                            result: 'success'
                                        })
                                    }
                                })
                            } else {
                                res.json({
                                    status: '0',
                                    msg: 'GoodDoc undefined',
                                })
                            }
                        }
                    })

                }
            } else {
                res.json({
                    status: '0',
                    msg: 'UserDoc undefined',
                })
            }

        }
    })

})

module.exports = router;