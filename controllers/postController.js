const Flash = require('../utils/Flash')
const {validationResult} = require('express-validator')
const formatter = require('../utils/validationFormatter')
const cheerio =require('cheerio')
const Post = require('../models/Post')
const Profile = require('../models/Profile')
const readingTime = require('reading-time')

exports.CreatePostGet = (req,res,next)=>{
    res.render('pages/dashboard/post/createPost',{
        title:'Create New Post',
        head:'Write Anything You Want',
        flashMessage:Flash.getMessage(req),
        path:{},
        error:{},
        value:{}
    })
}

exports.CreatePost = async (req,res,next)=>{

    

    let error = validationResult(req).formatWith(formatter)
    console.log(error.mapped())
    let {body,title,tags} = req.body
    let node = cheerio.load(body)
    let text = node.text()
   
    if(!error.isEmpty()){
        req.flash('fail','Something Error! Your Post has been Drafted')
        return  res.status(400).render('pages/dashboard/post/createPost',{
            title:'Create New Post',
            head:'Write Anything You Want',
            flashMessage:Flash.getMessage(req),
            path:{},
            error:error.mapped(),
            value:{
                text,
                title,
                tags,
                body
            }
        })
    }
   
   if(tags){
       tags = tags.split(',')
       tags.map(t=>t.trim())
   }

   let readTime = readingTime(body).text
   let profile = await Profile.findOne({user:req.user._id})
   let post = new Post({

    title,
    body,
    tags,
    author:req.user._id,
    profile:profile._id,
    thumbnail:'',
    readTime,
    likes:[],
    dislikes:[],
    comments:[]


   })

   if(req.file){
       post.thumbnail=`/uploads/${req.file.filename}`
   }

   try{

       let createNewPost = await post.save()

       await Profile.findOneAndUpdate(
           {user:req.user._id},
           {$push:{'posts':createNewPost._id}}
       )
       req.flash('success','Your Post have been Successfully Posted')
       res.redirect(`/dashboard/myProfile`)

   }
   catch(e){
       next(e)
   }






}

exports.editPostGet = async (req,res,next)=>{

    let postId = req.params.postId

   
    try{
        let post = await Post.findOne(
            {author:req.user._id,_id:postId}
            
        )
    

        if(!post){
            let error = new Error('404 Page Not Found')
            error.status =404
            throw error
        }

        res.render('pages/dashboard/post/editPost',{
            title:'Edit Post',
            head:'Edit Your Post',
            path:{},
            flashMessage:Flash.getMessage(req),
            post,
            value:{},
            error:{}

        })
    }
    catch(e){
        next(e)
    }

    


}

exports.editPostPost = async (req,res,next)=>{

    let postId = req.params.postId
    let {title,body,tags}=req.body 

    let post = await Post.findOne(
        {author:req.user._id,_id:postId}
        
    )

    let error = validationResult(req).formatWith(formatter)
   
    if(!error.isEmpty()){
        return res.render('pages/dashboard/post/editPost',{
            title:'Edit Post',
            head:'Edit Your Post',
            flashMessage:Flash.getMessage(req),
            path:{},
            error:error.mapped(),
            post
        })
    }

    if(tags){
        tags = tags.split(',')
        tags.map(t=>t.trim())
    }

      let thumbnail=post.thumbnail

     if(req.file){
         thumbnail=`/uploads/${req.file.filename}`
    }
 
    let readTime = readingTime(body).text
    try{

        await Post.findOneAndUpdate(
            {author:req.user._id,_id:postId},
            {$set:{
                title,
                body,
                tags,
                thumbnail,
                readTime
            }},
            {new:true}
        )

        req.flash('success','Post has been Updated')
        res.redirect('/dashboard/myProfile')

    }
    catch(e){
        next(e)
    }



}

exports.deletePostController = async (req,res,next)=>{

    let {postId} = req.params

    try{
        let post = Post.findOne(
            {author:req.user._id,_id:postId}
        )
    
        if(!post){
            let error = new Error('404 Page Not Found')
            error.status = 404
            throw error
        }

        await Post.findOneAndDelete({_id:postId})

        await Profile.findOneAndUpdate(
            {user:req.user._id},
            {$pull:{'posts':postId}},
            {new:true}
        )

        req.flash('success','Post Deleted Successfully')
        res.redirect('/dashboard/myProfile')



    }
    catch(e){

    }



}

