const {Schema,model} = require('mongoose')


const ProfileSchema = new Schema({
   
    user : {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    name : {
        type: String,
        trim: true,
        maxlength: 50,
        required:true
    },


    title: {
        type:String,
        trim:true,
        required:true,
        maxlength:100
    },
    bio:{
        type:String,
        trim:true,
        required:true,
        maxlength:500
    },
    profilePic:String,
    links:{
        facebook:String,
        website:String,
        twitter:String
    },
    posts:[
        {
            type:Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],

    bookmarks:[
        {
            type:Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    follow:[
        {
            type:Schema.Types.ObjectId,
            ref:'Profile'
        }
    ]
    
},{timestamps:true})

const Profile = model('Profile',ProfileSchema)

module.exports=Profile