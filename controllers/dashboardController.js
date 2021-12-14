const Flash = require('../utils/Flash')
const Profile = require('../models/Profile')
const User = require('../models/User')
const {validationResult} = require('express-validator')
const formatter = require('../utils/validationFormatter')
const Post = require('../models/Post')





exports.CreateProfileGet = async (req,res,next)=>{

    let profile =await Profile.findOne({user:req.user._id})

    try{

        if(profile){
           return res.redirect('/dashboard/myProfile')
        }
        res.render('pages/dashboard/CreateProfile',{
            title:'Create Your Account Profile',
            path:{},
            flashMessage:Flash.getMessage(req),
            error:{},
            value:{}
        })

    }
    catch(e){

        next(e)

    }

}


exports.CreateProfilePost = async (req,res,next)=>{

    let error = validationResult(req).formatWith(formatter)
    let {name,title,bio,website,facebook,twitter} = req.body
   
    if(!error.isEmpty()){
         req.flash('fail','Please Check Your Information')
           return res.render('pages/dashboard/CreateProfile',{
            title:'Create Your Account Profile',
            path:{},
            flashMessage:Flash.getMessage(req),
            error:error.mapped(),
            value:{
                name,
                title,
                bio,
                website,
                facebook,
                twitter
            }
        })
    }

   try{
    let profile = new Profile({
        user:req.user._id,
        name,
        title,
        bio,
        profilePic:req.user.profilePic,
        links:{
            website:website || '',
            facebook:facebook || '',
            twitter:twitter||''
        },
        posts:[],
        bookmarks:[]
    })


   let createProfile = await profile.save()

  await User.findOneAndUpdate(
      {_id:req.user._id},
      {$set:{profile:createProfile._id}}
  )
 


   req.flash('success',`Welcome To Diary Of Dreams ${createProfile.name}`)
   res.redirect('/dashboard/myProfile')


   }
   catch(e){

    next(e)

   }



}


exports.EditProfileGet = async (req,res,next)=>{

    let profile = await Profile.findOne({user:req.user._id})

     try{
           if(profile){
               res.render('pages/dashboard/edit-profile',{
                   title:`Edit Your Profile ${profile.name}`,
                   path:{},
                   flashMessage:Flash.getMessage(req),
                   error:{},
                   value:{},
                   profile
               })
           }
           else{
               res.redirect('/dashboard/createProfile')
           }
     }
     catch(e){
          next(e)


     }


    

}

exports.EditProfilePost = async (req,res,next)=>{

  try{

    let error = validationResult(req).formatWith(formatter)
   
   
    let profile = await Profile.findOne({user:req.user._id})

    if(!error.isEmpty()){
         req.flash('fail','Please Check Your Information')
       return res.render('pages/dashboard/edit-profile',{
            title:'Create Your Account Profile',
            path:{},
            flashMessage:Flash.getMessage(req),
            error:error.mapped(),
            value:{},
            profile
        })
    }

    let {name,title,bio,website,facebook,twitter} = req.body

    let updateProfile = {
        name,
        title,
        bio,
        links:{
            website:website || '',
            facebook:facebook || '',
            twitter:twitter||''
        }
    }

    await Profile.findOneAndUpdate(
        {user:req.user._id},
        {$set:updateProfile},
        {new:true}
    )
    req.flash('success','Your Profile is Updated')
    res.redirect('/dashboard/myProfile')

  }
  catch(e){
    console.log(e)
    next(e)

  }


}

exports.myProfile = async (req,res,next)=>{

    let profile = await Profile.findOne({user:req.user._id})

    let posts = await Post.find({author:req.user._id})
   

    try{
       if(profile){
          return res.render('pages/dashboard/profile',{
               title:`Profile`,
               path:'profile',
               flashMessage:Flash.getMessage(req),
               profile,
               posts
           })
       }

       res.redirect('/dashboard/createProfile')
    }
    catch(e){

        next(e)

    }

}

exports.BookmarksGetController = async(req,res,next)=>{
    try{
        let profile = await Profile.findOne({user:req.user._id})
        .populate({
            path:'bookmarks',
            model:'Post',
            select:'title body thumbnail'
        })

        let bookmarks = []
        if(req.user){
             
            let profiles = await Profile.findOne({user:req.user._id})
    
            if(profile){
                bookmarks = profiles.bookmarks
            }
    
        }
        res.render('pages/dashboard/bookmarks',{
            title:'My Bookmarks',
            flashMessage:Flash.getMessage(req),
            path:{},
            posts:profile.bookmarks,
            bookmarks
        })

    }
    catch(e){
           next(e)
    }
}