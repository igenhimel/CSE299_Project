
const authRoute = require('express').Router()
const {

    signUpGetController,
    signUpPostController,
    LoginGetController,
    LoginPostController,
    LogoutController,
    myData,
    GooglePostController

} = require('../controllers/authController')

const passport =require('passport')


const signupValidator = require('../validators/SignUpValidator')
const loginvalidator = require('../validators/loginvalidator')
const {isUnAuthenticated} = require('../middleware/authMiddleware')


authRoute.get('/google',passport.authenticate('google',{scope:['profile','email']}))
authRoute.get('/google/callback',passport.authenticate('google',{failureRedirect:'/'}),GooglePostController)

authRoute.post('/mydata',myData)

authRoute.get('/signup',isUnAuthenticated,signUpGetController)
authRoute.post('/signup',isUnAuthenticated,signupValidator,signUpPostController)


authRoute.get('/login',isUnAuthenticated,LoginGetController)
authRoute.post('/login',isUnAuthenticated,loginvalidator,LoginPostController)


authRoute.get('/logout',LogoutController)


module.exports=authRoute