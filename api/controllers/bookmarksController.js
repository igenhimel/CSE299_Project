const Profile = require('../../models/Profile')

exports.bookmarksController = async (req,res,next)=>{

    let {postId} = req.params
    

    if(!req.user){
        return res.status(403).json({
            message:'You are not an authenticated User'
        })
    }

    let userId = req.user._id
    let bookmarks = null 
    try{

        let profile = await Profile.findOne({user:userId})
        
        if(profile.bookmarks.includes(postId)){

            await Profile.findOneAndUpdate(
                {user:userId},
                {$pull:{'bookmarks':postId}}
            )

            bookmarks=false

        }  else{

            await Profile.findOneAndUpdate(
                {user:userId},
                {$push:{'bookmarks':postId}},
                {new:true}
            )

            bookmarks=true

        }

            res.status(200).json({
            bookmarks
        })


    }
    catch(e){
        console.log(e)
        return res.status(500).json({
            error:'Server Error Occured'
        })

    }

}