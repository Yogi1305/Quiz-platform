import mongoose from "mongoose";


const userModel= mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
   
    email:{
          type:String,
    },
   
    
    branch:{
        type: String,
    required: true
    },
    isAdmin:{
        type:Boolean,
    },
    passWord:{
         type:String,
         required:true
    },
    
},{timestamps:true})

export const  User =mongoose.model("User",userModel);