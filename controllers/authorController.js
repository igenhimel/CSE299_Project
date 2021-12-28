const Flash = require('../utils/Flash')

const User = require('../models/User')

const Post = require('../models/Post')

const Profile = require('../models/Profile')

exports.AuthorProfileGetController = async(req,res,next)=>{

    let userId =req.params.userId

    try{

        let author = await User.findById(userId)
                    .populate({
                        path:'profile',
                        populate:{
                            path:'posts'
                        }
                    })

        let posts = await Post.find({author:userId})
                    
        if(!posts){

            let error = new Error('Page Not Found')
            error.status(404)
            throw error
    
           }
           else{
            let follows = []
            
                 
                let profile = await Profile.findOne({user:req.user._id})
        
                    if(profile){
                        follows = profile.follow
                    }
    
                res.render('pages/explore/author',{
                    title:'Blogger Page',
                    flashMessage: Flash.getMessage(req),
                    path:{},
                    author,
                    posts,
                    follows,
                    profile
                })
    }
}
    catch(e){
         next(e)
    }

   
}