const Post = require('../models/Post')
const Flash = require('../utils/Flash')

exports.searchGetController = async (req,res,next)=>{

    let term =req.query.term
    let currentPage = parseInt(req.query.page)||1

    let itemPerPage = 2
    
    try{
         if(term==''){

           
         req.flash('fail','Please Provide Anything If You Want To Search')
          return  res.redirect(`/explore`)

         }

        let posts = await Post.find(
        
        {$or:[{'title':{'$regex':`.*${term}.*`,"$options":"i"}},{'body':{'$regex':`.*${term}.*`,"$options":"i"}},{'tags':{'$regex':`.*${term}.*`,"$options":"i"}}]}

        )
        .skip((itemPerPage*currentPage)-itemPerPage)
        .limit(itemPerPage)

        let totalPost = await Post.countDocuments(
            {$or:[{'title':{'$regex':`.*${term}.*`,"$options":"i"}},{'body':{'$regex':`.*${term}.*`,"$options":"i"}},{'tags':{'$regex':`.*${term}.*`,"$options":"i"}}]}
        )
        let totalPage = Math.ceil(totalPost/itemPerPage)

        res.render('pages/explore/search',{
            title:`Search For ${term}`,
            path:{},
            flashMessage:Flash.getMessage(req),
            searchTerm:term,
            itemPerPage,
            currentPage,
            totalPage,
            posts
        })

    }

    catch(e){
        next(e)
    }

}