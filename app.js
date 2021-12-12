require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const setRoutes = require('./routes/routes')
const setMiddleWare = require('./middleware/middlewares')
const config = require('config')
const app = express()


const MONGODB_URI=`mongodb+srv://${config.get('db-admin')}:${config.get('db-password')}@cluster0.13eyw.mongodb.net/CSE299`

app.set('view engine','ejs')
app.set('views', 'views')



//Middleware

setMiddleWare(app)

//Routes

setRoutes(app)

app.use((req,res,next)=>{

    let error = new Error('404! Page Not Found')
    error.status = 404
    next(error)


})

app.use((error,req,res,next)=>{
    if(error.status==404){
       return res.render('pages/error/404',{flashMessage:{},path:{}})
    }
    else{
        console.log(error)
        return res.render('pages/error/500',{flashMessage:{},path:{}})
    }
})

const PORT = process.env.PORT || 3030

mongoose.connect(MONGODB_URI,{useNewUrlParser:true
})
.then(()=>{
        app.listen(PORT,(err)=>{
        console.log(`Server is Running on port ${PORT}`)
    })
})
.catch((e)=>{
    console.log(e)
})

module.exports=app;