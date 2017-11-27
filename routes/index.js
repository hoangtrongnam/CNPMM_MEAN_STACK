const express = require('express');
const router = express.Router();

const Product = require('../models/index');


router.get('/products', (req,res, next) => {
    Product.find((err,product)=>{
        res.json((product));
    })
});

router.post('/product',(req,res, next)=>{

    let newProduct = new Product({
        TenSP: req.body.TenSP,
        SoLuong: req.body.SoLuong,
        DonGiaBan: req.body.DonGiaBan,
        MoTa: req.body.MoTa,
        Hinh: req.body.Hinh,
        ChuThich: req.body.ChuThich
    });
    newProduct.save((err, product) => {
        if(err)
        {
            rs.json({msg:'loi'});
        }
        else{
            res.json({msg:'thanh cong!'});
        }
    })
})

router.delete('/product/:id',(req,res,next)=>{
    console.log(req.params.id);
    Product.remove({_id: req.params.id}, (err,result)=>{
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(result);
        }
    })
})

module.exports = router;
