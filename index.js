const express = require('express');
const cors = require('cors');
var path = require('path');
const app = express();
const port = 4000;
var mongoose = require('mongoose');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var routes = require('./routes/index'); //importing route
var cartRouter = require('./routes/cart');
var config = require('./config/db');


// body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());


app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// app.use(session({
//     secret: 'ilovescotchscotchyscotchscotch', // session secret
//     resave: true,
//     saveUninitialized: true
// }));
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);
app.use('/carts', cartRouter);
app.use((req,res,next)=>{
    res.header('Access-Contrl-Allow-Credentials',true);
    res.header('Access-Contrl-Allow-Origin',req.headers.origin);
    res.header('Access-Contrl-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Contrl-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});


app.get('/', (req,res)=>{
    res.send('foobar');
})
mongoose.Promise = global.Promise;
mongoose.connect(config.url, (err) => {
    if (err) {
        console.log('mongoose failed to connect', {err:err});
    }
    else {
        console.log('Connect to database : ' + config.db);
    }
});

    
app.listen(port, function(){
    console.log("server listening on port : " + port);
});
module.exports = app;