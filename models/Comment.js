const {Schema,model} = require('mongoose')


const CommentSchema = new Schema({

    post:{
        type:Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },

    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    body:{
        type:String,
        trim:true,
        required:true
    },
    replies:[
         {
             body:{
                 type:String,
                 required:true
             },

             user:{
                 type:Schema.Types.ObjectId,
                 ref:'User',
                 required:true
             },

             createdAt:{
                 type:Date,
                 default: new Date()
             }
         }
    ]


},{timestamps:true})

const Comment = model("Comment",CommentSchema)

module.exports= Comment