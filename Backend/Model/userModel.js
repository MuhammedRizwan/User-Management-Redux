const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true
    },
    profilePicture:{
        type:String
    },
    password:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

module.exports=mongoose.model('User',userSchema)