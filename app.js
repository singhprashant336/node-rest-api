const express = require('express')
const app = express();
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

const uri = "mongodb+srv://MyProject:MyProject@cluster0.n7paa.mongodb.net/users?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization")
    if(req.method=== 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,PATCH,DELETE,GET,POST')
        return res.status(200).json({});
    }
    next();

})

app.use('/uploads',express.static('uploads'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(morgan('dev'))
app.use('/products',productRoutes)
app.use('/orders',orderRoutes)
app.use('/user',userRoutes)
app.use((req,res,next)=>{
    const err = new Error('Not Found');
    err.status=404
    next(err);
})
app.use((err,req,res,next)=>{
    res.status(err.status||500);
    res.json(
        {
            err:{
                message:err.message
            }
        }
    )
})
module.exports= app;