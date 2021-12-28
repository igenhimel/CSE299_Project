const router = require('express').Router()

const {AuthorProfileGetController} = require('../controllers/authorController')
router.get('/:userId',AuthorProfileGetController)


module.exports=router