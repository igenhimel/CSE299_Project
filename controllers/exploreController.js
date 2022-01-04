const Flash = require('../utils/Flash')
const Post = require('../models/Post')
const moment = require('moment')
const Profile = require('../models/Profile')
const { post } = require('jquery')


/**
 * Extract date and time from genDate()
 * @param {integer} days - take integer input number as days 
 * @returns subtract recent day to given paramater days and shows the difference
 **/

function genDate(days){

     let date = moment().subtract(days,'days')

     return date.toDate()

}

/**
 * filtering post which posted in a week,month or recents
 * @param {string} filter - take a string input as 'week','recent','months'
 * @returns subtract recent day to given paramater days and shows the difference and provide 1 week,months ago post
 */

function filteringData(filter){
    let filterObj = {}
    let order =1

    switch (filter) {
        case 'week':

            filterObj={createdAt:{$gt:genDate(7)}}
            order =-1
            break;

        case 'month':

            filterObj={createdAt:{$gt:genDate(30)}}
            order =-1
            break;

        case 'all':

            order=-1
            break;           
    
        default:
            break;
    }

    return {
        filterObj,
        order
    }
}

/**
 * API Method for view all post
 * @param {object} req -request object of the exploreController method of exploreController
 * @param {obejct} res -rsponse object of the exploreController method of exploreController
 * @param {object} next -next object of the exploreController method of exploreController
 */

exports.exploreController = async (req,res,next)=>{

    

    let filter = req.query.filter || 'recent'
    let currentPage = parseInt(req.query.page) || 1
    let itemPerPage = 2
    let totalPost = await Post.countDocuments() 
    let totalPage = Math.ceil(totalPost/itemPerPage)

    let {filterObj,order} = filteringData(filter.toLowerCase())
   
    try{
      
        let posts = await Post.find(filterObj)
        .skip((currentPage*itemPerPage)-itemPerPage)
        .limit(itemPerPage)
        .sort(order==1?'-createdAt':'createdAt')
        .populate('author profile','name username profilePic')

        let bookmarks = []
        if(req.user){
             
            let profile = await Profile.findOne({user:req.user._id})
    
            if(profile){
                bookmarks = profile.bookmarks
            }
    
        }

        res.render('pages/explore/explore',{
        title:'Explore The World',
        path:'explore',
        flashMessage:Flash.getMessage(req),
        filter,
        posts,
        itemPerPage,
        currentPage,
        totalPage,
        bookmarks
          })

    }
    catch(e){
        next(e)
    }


 
}

exports.singlePageGetController = async (req,res,next)=>{

    let {postId} = req.params

    try{
        let post = await Post.findById(postId)
        .populate('author profile','name username profilePic')
        .populate({
            path:'comments',
            populate:{
                path: 'user',
                select: 'username profilePic'
            }
        })
        .populate({
            path:'comments',
            populate:{
                path:'user',
                populate:{
                    path:'profile',
                    select:'name'
                }
            }
        })
        .populate({
            path:'comments',
            populate:{
                path:'replies.user',
                select:'username profilePic'
            }
        })
        .populate({
            path:'comments',
            populate:{
                path:'replies.user',
                populate:{
                    path:'profile',
                    select:'name'
                }
            }
        })
    
       if(!post){

        let error = new Error('Page Not Found')
        error.status(404)
        throw error

       }
       else{
        let bookmarks = []
        if(req.user){
             
            let profile = await Profile.findOne({user:req.user._id})
    
            if(profile){
                bookmarks = profile.bookmarks
            }
    
        }
    
        res.render('pages/explore/singlePage',{
            title:post.title,
            path:{},
            flashMessage:Flash.getMessage(req),
            post,
            bookmarks
        })
       }
    }
    catch(e){
        next(e)
    }


}

exports.myHome = async(req,res,next)=>{
    try{

        let profile = await Profile.findOne({user:req.user._id})
        .populate({
            path:'follow',
            model:'Profile',
            populate:{
                path:'posts',
                model:'Post'
            }
        })

        let follows = profile.follow

        res.render('pages/explore/myHome',{
            title:'My Home',
            flashMessage: Flash.getMessage(req),
            path:'home',
            follow:profile.follow,
            profile,
            totalFollower:follows.length
        })

    }
    catch(e){
        next(e)
    }
}

exports.homePageGetController = async(req,res,next)=>{
    res.render('pages/explore/homepage',{
        title:'Home Page',
        flashMessage: Flash.getMessage(req),
        path:{},

    })
}