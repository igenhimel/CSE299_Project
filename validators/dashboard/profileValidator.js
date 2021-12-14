const {body} = require('express-validator')
const validator = require('validator')

const linkValidator = require('../dashboard/customvalidate')

const profileValidate = [

    body('name')
    .not().isEmpty().withMessage('Please Provide Your Name')
    .isLength({max:50}).withMessage('Length Must Be Within 50 Charcters')
    .trim(),

    body('title')
    .not().isEmpty().withMessage('Please Provide a short title')
    .isLength({max:100}).withMessage('Length Must Be Within 100 Charcters')
    .trim(),

    body('bio')
    .not().isEmpty().withMessage('Please Provide a Short Biography')
    .isLength({max:500}).withMessage('Length Must Be Within 500 Charcters')
    .trim(),

    body('website')
    .custom(linkValidator),
    body('facebook')
    .custom(linkValidator),
    body('twitter')
    .custom(linkValidator)


]

module.exports =profileValidate