const validator = require('validator')

module.exports = async (website)=>{
    if(website){

     if(!validator.isURL(website)){
        return Promise.reject('Please Provide Valid URL')
     }

    }
}