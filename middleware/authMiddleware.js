const User = require('../models/User')
const Profile = require('../models/Profile')
exports.bindUserWithRequest = () =>{

    return async (req,res,next) => {
        if(!req.session.isLoggedIn){
           return next()
        }

        try{

            let user = await User.findById(req.session.user._id)
            req.user = user
            next()

        }
        catch(e){
            console.log(e)
            next(e)
        }


    }

}

exports.isAuthenticated = (req,res,next) =>{
    if(!req.session.isLoggedIn){
       req.flash('fail','Please Login To Your Account First')
       return res.redirect('/auth/login')
      
    }
    next() 
}

exports.isUnAuthenticated = (req,res,next) =>{
    if(req.session.isLoggedIn){
       return res.redirect('/explore')
      
    }
    next() 
}

exports.isUnAuthenticatedForJson = (req,res,next) =>{
    if(req.session.isLoggedIn || !req.session.isLoggedIn){
       return res.render('pages/error/404',{flashMessage:{},path:{}})
      
    }
    next() 
}