require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const app = express()


const MONGODB_URI=`mongodb+srv://${config.get('db-admin')}:${config.get('db-password')}@cluster0.13eyw.mongodb.net/eblog299`

app.set('view engine','ejs')
app.set('views', 'views')



const PORT = process.env.PORT || 3000

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