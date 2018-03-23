/**
 * Created by Seven on 2018/3/21.
 */
var express=require('express');
var router = express.Router();

var mongoose= require('mongoose');
var Goods=require('../models/goods');


mongoose.connect('mongodb://127.0.0.1:27017/demo');

mongoose.connection.on('connected',function () {
  console.log('mongodb connect success')
});

mongoose.connection.on('error',function () {
  console.log('mongodb connect failed')
});

mongoose.connection.on('disconnected',function () {
  console.log('mongodb connect disconnected')
});

router.get('/',function (req,res,next) {
  // res.send( 'hello goods');
  let page=parseInt(req.param("page"));
  let pageSize=parseInt(req.param("pageSize"));
  let sort=req.param("sort");
  let skip=(page-1)*pageSize;
  var priceGt='',priceLte='';
  let priceLevel=req.param("pricelevel");
  let params={};
  if(priceLevel!='all'){
    switch (priceLevel){
      case '0':priceGt=0;priceLte=500;break;
      case '1':priceGt=500;priceLte=1000;break;
      case '2':priceGt=1000;priceLte=2000;break;
      // case '3':priceGt=1000;priceLte=5000;break;
    }
    params={
      salePrice:{
          $gt:priceGt,
          $lte:priceLte
      }
    }
  }

  console.log(priceLevel,page,params);
  let goodsModel=Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({"salePrice":sort});

  goodsModel.exec(function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message
      })
    }else{
      res.json({
        status:"0",
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
  // Goods.find({},function (err,doc) {
  //   if(err){
  //    res.json({
  //      status:"1",
  //      msg:err.message
  //    })
  //   }else{
  //   res.json({
  //     status:"0",
  //     msg:'',
  //     result:{
  //       count:doc.length,
  //       list:doc
  //     }
  //   })
  //   }
  // })
});
module.exports = router;
