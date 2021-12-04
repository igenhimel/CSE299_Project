const {Schema,model} =require('mongoose')


const PostSchema =new Schema({

    title:{
        type:String,
        trim:true,
        required:true,
        maxlength:100
    },

    body:{
        type:String,
        required:true,
        maxlength:5000
    },

    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    profile:{

        type:Schema.Types.ObjectId,
        ref:'Profile',
        required:true

    },
    tags:{
        type:[String]
    },
    thumbnail:String,
    readTime:String,

    likes:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    dislikes:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],

    comments:[{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    }]

},{timestamps:true})





const Post =model("Post",PostSchema)

module.exports = Post