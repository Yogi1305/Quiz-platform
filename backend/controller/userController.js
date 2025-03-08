
import { User } from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// register
export const register=async(req,res)=>{

    const {fullName,email,branch,passWord}=req.body;

    if(!fullName || !email ||!branch || !passWord)
        return res.status(400).json({message :"all field are required"});
    const finduser= await User.findOne({email});
    if(finduser)
      return res.status(200).json({message:"user alreday exit"});
    const hashpassword= await bcrypt.hash(passWord,10);

    const newuser= User.create({
        fullName,
        email,
        branch,
        passWord:hashpassword,
        isAdmin:false
    })
    await newuser.save;
    return res.status(201).json({
        message: "Account created successfully",
        success: true,
      });
}

// login

export const login=async(req,res)=>{
    const{email,passWord}=req.body
    if(!passWord || !email)
        return res.status(400).json({message:"all fields are required"});
   
    const user=await User.findOne({email});
    if(!user)
        return res.status(400).json({message:"user is not register"});
    
    const ispassword= await bcrypt.compare(passWord,user.passWord);
    if(!ispassword)
        return res.status(400).json({message:"incorrect password"});
    
     //  generate jwt token
      const tokenData = { userId: user._id };
      const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      // console.log("token is ",token);
      
    
      return res
        .cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .status(200)
        .json({
          _id: user._id,
          fullName: user.fullName,
          success: true,
          message: `Welcome back ${user?.fullName?.toUpperCase()}`,
        });
    };
    // logout
    export const logout = async(req, res) => {
      try {
        const {userId}=req.id;
        const user= await User.findOne({userId});
        if(user){
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
          message: `${user.fullName} logged out successfully.`,
        });}
      } catch (error) {
        console.log(error);
      }
    };
    // checklogging

    export const checklogging=async(req,res)=>{
          return res.status(200).json({success:true});
    }
// admin

export const Admin= (req,res)=>{
      return res.status(200).json({message:"admin",success:true})
}