const Profile = require('../../models/Profile')

exports.FollowController = async (req,res,next)=>{

    let {profileId} = req.params
    

    if(!req.user){
        return res.status(403).json({
            message:'You are not an authenticated User'
        })
    }

    let userId = req.user._id
    let follow = null 
    try{

        let profile = await Profile.findOne({user:userId})
        
        if(profile.follow.includes(profileId)){

            await Profile.findOneAndUpdate(
                {user:userId},
                {$pull:{'follow':profileId}}
            )

            follow=false

        }  else{

            await Profile.findOneAndUpdate(
                {user:userId},
                {$push:{'follow':profileId}},
                {new:true}
            )

            follow=true

        }

            res.status(200).json({
            follow
        })


    }
    catch(e){
        console.log(e)
        return res.status(500).json({
            error:'Server Error Occured'
        })

    }

}