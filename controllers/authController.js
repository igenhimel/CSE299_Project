let User = require('../models/User')
let bcrypt = require('bcrypt')  
const {validationResult} = require('express-validator')
const errorFormatter = require('../utils/validationFormatter')
const session = require('express-session')
const Flash = require('../utils/Flash')
const Profile = require('../models/Profile')




exports.realTimeValidation = (req,res,next)=>{
  User.find()
  .then(data=>{
    res.status(200).json(data)
  })
}


exports.signUpGetController = (req,res,next)=>{
 
 
    res.render('pages/auth/signup',{
      
      title:'Sign Up To Diary of Dreams',
      path:'signpath',
      error:{},
      value:{},
      flashMessage:Flash.getMessage(req)
    
    })

}



exports.signUpPostController = async (req,res,next)=>{


    let {username,email,password,cpassword} =req.body
    
    let errors = validationResult(req).formatWith(errorFormatter)
    console.log(errors.mapped())
    if(!errors.isEmpty()){
     req.flash('fail','Please Check Your Form')
     
     return   res.render('pages/auth/signup',{
       
      title:'Sign Up To Diary of Dreams',
      path:'signpath',
      error:errors.mapped(),
      value:{
        username,
        email,
        password
      },
      flashMessage:Flash.getMessage(req)
    
    })
    }


  try{

    let hashPassword = await bcrypt.hash(password,11)

    let user = new User({
        username, 
        email,
        password:hashPassword
    })

    await user.save()
    req.flash('success','Please Login To Your Account')
    res.redirect('/auth/login')
  

  }

  catch(e){
      console.log(e)
      next(e)
  }

   
}



exports.loginGetController = (req,res,next)=>{

  res.render('pages/auth/login',{
    title:'Log In To Your Account',
    path:'logpath',
    error:{},
    value:{},
    ErrorPass:{},
    flashMessage:Flash.getMessage(req)
  })
   

}

exports.loginPostController = async (req,res,next)=>{

    let {email,password} = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    let user = await User.findOne({email})

    try{

    if(!errors.isEmpty()){
      req.flash('fail','Authentication Failed!')
      return res.render('pages/auth/login',{
         title:'Log In To Your Account',
         path:'logpath',
         error:errors.mapped(),
         ErrorPass:{},
         flashMessage:Flash.getMessage(req)
       })
 
      }
 
     let match = await bcrypt.compare(password,user.password)
 
     if(!match){
      req.flash('fail','Authentication Failed!')
       let myError={}
       myError.password='Incorrect Username Or Password'
       return res.render('pages/auth/login',{
         title:'Log In To Your Account',
         path:'logpath',
         error:{},
         ErrorPass:myError,
         flashMessage:Flash.getMessage(req)

       })
 
     }

  
  req.session.isLoggedIn=true,
  req.session.user=user,
  req.session.save(err=>{
    if(err){
      console.log(err)
      return next(err)
    }
    else{
      req.flash('success','Successfully Logged In')
      res.redirect('/dashboard/myProfile')
    }
  })

  }
  catch(e){
       console.log(e)
       next(e)
         }
    

    
}

exports.googlePostController = async (req,res,next)=>{

  try{


  req.session.isLoggedIn=true,
  req.session.user=req.user._id,
  req.session.save(err=>{
    if(err){
      console.log(err)
      return next(err)
    }
    else{
      req.flash('success','Successfully Logged In')
      res.redirect('/dashboard/myProfile')
    }
  })

  }
  catch(e){
       console.log(e)
       next(e)
         }
     
}



    





exports.logoutController = (req,res,next)=>{
  
    req.session.destroy(err=>{

      if(err){
        console.log(err)
        return next(err)
      }
      else{
        res.redirect('/auth/login')
      }

    })
    
}