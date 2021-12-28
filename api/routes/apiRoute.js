
const api = require('express').Router()

const {

    createCommentPost,
    repliesPostController

}= require('../controllers/commentController')

const {

    likesGetController,
    dislikesGetController

} = require('../controllers/likeDislikeController')

const {

    bookmarksController

} = require('../controllers/bookmarksController')

const {

    FollowController

} = require('../controllers/followController')

const {isAuthenticated} = require('../../middleware/authMiddleware')

api.post('/comment/:postId',isAuthenticated,createCommentPost)

api.post('/comment/replies/:commentId',isAuthenticated,repliesPostController)

api.get('/likes/:postId',isAuthenticated,likesGetController)
api.get('/dislikes/:postId',isAuthenticated,dislikesGetController)

api.get('/bookmarks/:postId',isAuthenticated,bookmarksController)
api.get('/follow/:profileId',isAuthenticated,FollowController)

module.exports = api