
const post = require('express').Router()

const {isAuthenticated} =require('../middleware/authMiddleware')
const {
        CreatePostGet,
        CreatePost,
        editPostGet,
        editPostPost,
        deletePostController
    
    } = require('../controllers/postController')
const postValidator = require('../validators/post/postValidator')
const upload = require('../middleware/UploadMiddleware')

post.get('/createPost',isAuthenticated,CreatePostGet)
post.post('/createPost',isAuthenticated,upload.single('thumbnail'),postValidator,CreatePost)

post.get('/edit/:postId',isAuthenticated,editPostGet)
post.post('/edit/:postId',isAuthenticated,upload.single('thumbnail'),postValidator,editPostPost)

post.get('/delete/:postId',isAuthenticated,deletePostController)
module.exports = post