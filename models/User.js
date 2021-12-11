const {Schema,model} = require('mongoose')

// It's a User model...
const UserSchema = new Schema({
    username : {
        type: String,
        trim: true,
        maxlength: 15,
        required:true
    },

    email: {
        type: String,
        trim: true,
        required:true
    },

    password: {
        type: String
    },

    googleId:{
        type:String
    },
    profile: {
        type : Schema.Types.ObjectId,
        ref: 'Profile'
    },
    profilePic:{
        type:String,
        default:'/uploads/default.jpg'
        
    }
},{
    timestamps:true
})

const User = model('User',UserSchema)

module.exports=User