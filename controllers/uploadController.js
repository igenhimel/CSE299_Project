const User = require('../models/User')
const Profile = require('../models/Profile')
const fs = require('fs')

exports.UploadController = async (req,res,next)=>{

    

  if(req.file){
    try{
        let profilePic = `/uploads/${req.file.filename}`
        let profile = await Profile.findOne({user:req.user._id})
        if(profile){
            await Profile.findOneAndUpdate(

                {user:req.user._id},
                {$set:{profilePic}}

            )
        }

        await User.findOneAndUpdate(
            {_id:req.user._id},
            {$set:{profilePic}}
        )

        res.status(200).json({
            profilePic
        })



    }
    catch(e){

        res.status(500).json({
            profilePic:req.user.profilePic
        })

    }
  }

  else{
      res.status(500).json({
          profilePic:req.user.profilePic
      })
  }
 


}

exports.deleteProfilePic = (req,res,next)=>{

    try{
    const defaultPic = `/uploads/default.jpg`
    const CurrrentProfile = req.user.profilePic
    fs.unlink(`public${CurrrentProfile}`, async (err)=>{
        let profile = await Profile.findOne({user:req.user._id})
        if(profile){
         await Profile.findOneAndUpdate(
                
            {user:req.user._id},
            {$set:{profilePic:defaultPic}},
            {new:true}
            )
        }
        await User.findOneAndUpdate(
        {_id:req.user._id },
        {$set:{ profilePic:defaultPic}},
        {new:true}
        
        )

        res.status(200).json({
            profilePic:defaultPic
        })     
       })
    }

    catch(e){

        console.log(e)
        res.status(500).json({
            message:'Can not remove Profile Pic'
        })


       }


}

exports.postImageUploadController = (req,res,next)=>{

    if(req.file){
       return res.status(200).json({
            imageURL:`/uploads/${req.file.filename}`
        })
    }

    return res.status(500).json({
        message:'File Upload Failed'
    })

}