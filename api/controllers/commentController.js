const Post = require('../../models/Post')
const Comment = require('../../models/Comment')
const moment = require ('moment')
const Profile = require('../../models/Profile')

exports.createCommentPost = async (req,res,next)=>{
    
    let {postId} = req.params
    let {body} = req.body

    if(!req.user){
        return res.status(403).json({
            error:'You are not authenticated User'
        })
    }

    try{
        
        let comment = new Comment({
        post:postId,
        user:req.user._id,
        body,
        replies:[]
    })

    let createdComment = await comment.save()

    await Post.findOneAndUpdate(
        {_id:postId},
        {$push:{'comments':createdComment._id}}
    )

    let commentJSON = await Comment.findById(createdComment._id)
    .populate({
        path:'user',
        select:'profilePic username'
    })
    .populate({
        path:'user',
        populate:{
            path:'profile',
            select:'name'
        }
    })

    return res.status(201).json(commentJSON)


    }
    catch(e){
        console.log(e)
        return res.status(500).json({
            error:'Server Error Occured'
        })
        
    }



}


exports.repliesPostController = async (req,res,next)=>{

    let {commentId} = req.params
    let {body} = req.body

    if(!req.user){
        return res.status(403).json({
            message:'You are not an authenticated User'
        })
    }

    let reply = {
        user:req.user._id,
        body
    }

    try{

        await Comment.findOneAndUpdate(
            {_id:commentId},
            {$push:{'replies':reply}}
        )

    let profile = await Profile.findOne({user:req.user._id})

        return res.status(201).json({
            ...reply,
            profilePic:req.user.profilePic,
            name:profile.name
        })

    }
    catch(e){
        
        console.log(e)
        return res.status(500).json({
            error:'Server Error Occured'
        })

    }



}