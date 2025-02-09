import jwt from "jsonwebtoken"

export const isloggedin=async(req,res,next)=>{
     
    try {
        const token=req.cookies.token;
        // console.log(token);
    if(!token)
    {
        return res.status(400).json({message:"token is not found"});
    }

    const verifytoken = await jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(!verifytoken)
        return res.status(401).json({message:"invalid token"});
    req.id=verifytoken.userId;
    next();
    } catch (error) {
        console.log("islogged middleware error ",error);
        
    }

}