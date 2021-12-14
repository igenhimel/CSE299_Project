const {body} = require('express-validator')
const User = require('../models/User')

const signupValidator = [


    body('username')
    .isLength({min:2,max:15})
    .withMessage('Username Must be within 2 to 15 characters')
    .custom(async username=>{

        let user = await User.findOne({username})

        if(user){
            return Promise.reject('Username Already Used')
        }

    })
    .trim()
    ,

    body('email')
    .isEmail().withMessage('Please Provide a Valid Email')
    .custom(async email=>{

        let user = await User.findOne({email})

        if(user){
            return Promise.reject('Email Already Used')
        }

    }),

    body('password')
    .isLength({min:5,max:15}).withMessage('Please Provide a Strong Password')
    ,

    body('cpassword')
    .custom((cpassword,{req})=>{
        if(cpassword!=req.body.password){
            throw new Error('Password Did Not Matched')
        }

        return true
    })




]

module.exports = signupValidator