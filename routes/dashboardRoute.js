
const dashRouter = require('express').Router()
const profileValidator =require('../validators/dashboard/profileValidator')
const {
  
    CreateProfileGet,
    CreateProfilePost,
    EditProfileGet,
    EditProfilePost,
    myProfile,
    BookmarksGetController

} = require('../controllers/dashboardController')

const {
    
    isAuthenticated

} =require('../middleware/authMiddleware')




dashRouter.get('/bookmarks',isAuthenticated,BookmarksGetController)
dashRouter.get('/CreateProfile',isAuthenticated,CreateProfileGet)
dashRouter.post('/CreateProfile',profileValidator,isAuthenticated,CreateProfilePost)

dashRouter.get('/edit-profile',isAuthenticated,EditProfileGet)
dashRouter.post('/edit-Profile',isAuthenticated,profileValidator,EditProfilePost)

dashRouter.get('/myProfile',isAuthenticated,myProfile)

module.exports=dashRouter