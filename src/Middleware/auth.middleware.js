const { Apierror } = require("../utils/Apierror.utils")
const {User} = require("../Model/user.model");
const jwt=require("jsonwebtoken")

const jwtverify=async(req,res,next)=>{
    const Token=req.cookies?.Accesstoken ||
     req.header("Authorization")?.replace("Bearer ","")

     if(!Token){
        throw new Apierror(400,"Accesstoken is required")
     }
     try{
        const decoded=await jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET)
        
        const user=await User.findById(decoded._id).select("-password -Refreshtoken");
        if(!user){
            throw new Apierror(400,"Unauthorised user")
        }

      if (decoded.tokenVersion !== user.tokenVersion) {
      return res
      .status(401)
      .json({ message: "Session expired. Please log in again." });
      }

        req.user=user
        next()
     }
     catch(error){
        throw new Apierror(400,error.message|| "jwt verification falid")
     }

}
module.exports={jwtverify}