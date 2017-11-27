const Product = require('../models/index');
const Cart = require('../models/cart');
const express =require('express');
const router = express.Router();





router.get('/addcart/:id', function(req, res, next) {
    var id = req.params.id;
    console.log("addto cart",req.sessionID)
    var cart = req.session.cart ? req.session.cart : {};
  
    Product.findById(id, function(err, sp) {
      if (err) {
        res.json({ success: false, message: 'faile'});
      }
      else{
          cart[sp.id] = sp
        // cart.add(sp, sp.id);//chuyền giá trị vào hàm add
        req.session.cart = cart;
        console.log(sp,sp.id);
        res.json({ success: true, message: 'buy item success',carts:cart});
      }
    });
  });
router.get('/shoppingcart', (req, res, next)=>{
    console.log("show cart",req.sessionID)
    if (req.session.cart == undefined) {
        res.json({ success: false, message: 'no session',products:null });
    }
    else
    {
    var cart = req.session.cart;
    // console.log(cart.generateArray());
    console.log(cart)
    // console.log(products);
    // res.json({ success: true, message: 'success', products: cart.generateArray(), totalPrice: cart.totalPrice});
    }
});

router.get('/removecart', function (req, res, next) {
    if (!req.session.cart) {
        res.json({ success: false, message: 'no session' });
    }
    if(req.session.cart.items===undefined)
    {
        res.json({ success: false, message: 'no items' });
    }
    else
    {
    req.session.destroy();
    res.json({ success: true, message: 'remove all product success'});
    }
});
router.get('/reduceitem/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.json({ success: true, message: 'you are reduce product!'});
});
router.get('/removeitem/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.json({ success: true, message: 'you are remove a product to bag shoping!'});
});
router.get('/checkout', function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', function(req, res, next) {
    if (!req.session.cart) {
        res.json({ success: false, message: 'you have not product in bag!'});
    }
    var cart = new Cart(req.session.cart);
    
    var stripe = require("stripe")(
        "sk_test_fwmVPdJfpkmwlQRedXec5IxR"
    );

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function(err, result) {
            req.flash('success', 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('/');
        });
    }); 
});

module.exports = router ; 