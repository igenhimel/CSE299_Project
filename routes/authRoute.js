
const authRoute = require('express').Router()
const {

    signUpGetController,
    signUpPostController,
    loginGetController,
    loginPostController,
    logoutController,
    realTimeValidation,
    googlePostController

} = require('../controllers/authController')

const passport =require('passport')


const signupValidator = require('../validators/SignUpValidator')
const loginvalidator = require('../validators/loginvalidator')
const {isUnAuthenticated} = require('../middleware/authMiddleware')


authRoute.get('/google',passport.authenticate('google',{scope:['profile','email']}))
authRoute.get('/google/callback',passport.authenticate('google',{failureRedirect:'/'}),googlePostController)

authRoute.post('/realTimeValidation',realTimeValidation)

authRoute.get('/signup',isUnAuthenticated,signUpGetController)
authRoute.post('/signup',isUnAuthenticated,signupValidator,signUpPostController)


authRoute.get('/login',isUnAuthenticated,loginGetController)
authRoute.post('/login',isUnAuthenticated,loginvalidator,loginPostController)


authRoute.get('/logout',logoutController)


module.exports=authRoute