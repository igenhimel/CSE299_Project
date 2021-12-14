const upload = require('express').Router()
const {UploadController,deleteProfilePic,postImageUploadController} = require('../controllers/uploadController')
const uploads = require('../middleware/UploadMiddleware')
const {isAuthenticated} = require('../middleware/authMiddleware')


upload.post('/ProfilePic',isAuthenticated,uploads.single('upload_pp'),UploadController)
upload.delete('/ProfilePic',isAuthenticated,deleteProfilePic)

upload.post('/postImage',isAuthenticated,uploads.single('post-image'),postImageUploadController)

module.exports = upload 