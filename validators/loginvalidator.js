const {body} =require('express-validator')
const User = require('../models/User')


const loginvalidator = [

         body('email')
         .custom(async email=>{

            const user = await User.findOne({email})

            if(!user){
                return Promise.reject('Incorrect Username or Password')
            }

         })

]

module.exports=loginvalidator