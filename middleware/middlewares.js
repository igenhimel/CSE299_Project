const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const {bindUserWithRequest}= require('../middleware/authMiddleware')
const {setLocals} = require('../middleware/setLocals')
const flash = require('connect-flash')
const config = require('config')
const passport = require('passport')



require('../config/passport')(passport)

const MONGODB_URI=`mongodb+srv://${config.get('db-admin')}:${config.get('db-password')}@cluster0.13eyw.mongodb.net/diary`

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
  });

const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended:true}),
    express.json(),
    session({
        secret:'keyboard cat',
        resave:false,
        saveUninitialized:false,
        store:store,
        cookie : {
            maxAge: 1000* 60 * 60 *24 * 365
        }
    }),
    flash(),
    bindUserWithRequest(),
    setLocals(),
    passport.initialize(),
    passport.session()
    

]

module.exports = app =>{
    middleware.forEach(m=>{
        app.use(m)
    })
}
