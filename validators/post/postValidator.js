const {body} = require('express-validator')
const cheerio = require('cheerio')

const postValidation = [

   body('title')
   .not().isEmpty().withMessage('Please Provide a Title')
   .isLength({max:100}).withMessage('Title Length Must be less than 100'),

   body('body')
   .not().isEmpty().withMessage('Please Provide Post Body')
   .custom(value=>{

    let node =cheerio.load(value)
    let text =node.text()

    if(text.length>5000){
        throw new Error('Length must be less than 5000')
    }
    return true

   })


]


module.exports = postValidation