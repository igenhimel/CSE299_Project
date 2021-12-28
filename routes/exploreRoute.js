const explore = require('express').Router()

const {exploreController,singlePageGetController,homePageGetController, myHome} = require('../controllers/exploreController')
const {
    
    isAuthenticated

} =require('../middleware/authMiddleware')
const {isUnAuthenticated} = require('../middleware/authMiddleware')



explore.get('/',exploreController)
explore.get('/home',isAuthenticated,myHome)
explore.get('/homepage',isUnAuthenticated,homePageGetController)
explore.get('/:postId',singlePageGetController)

module.exports =explore