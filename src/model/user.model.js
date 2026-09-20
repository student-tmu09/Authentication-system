const mongoose=require("mongoose")
const bcrypt = require('bcrypt')
const jwt=require("jsonwebtoken")
const { parse } = require("dotenv")


const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            index:true,
        },
       email:{
            type:String,
            unique:true,
            trim:true
        },
        googleId:{
            type:String,
        },
        phone:{
            type:String,
            parse:true,
            trim:true
        },
        role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
        },

        password:{
            type:String,
            trim:true
        },
        avatar:{
            type:String,
        },
        Verified:{
            type:Boolean,
            default:false
        },
        Refreshtoken:{
            type:String,
        },
        tokenVersion: {
         type: Number,
            default: 0
}
    },
    {
        timestamps:true
    }
)
userSchema.pre("save",async function(next){
    if(!this.isModified("password") || !this.password) return next
    this.password=await bcrypt.hash(this.password,10)
    next
})
userSchema.methods.generateRefreshtoken=async function(){
    return jwt.sign({_id:this._id,username:this.username
        ,email:this.email,tokenVersion: this.tokenVersion},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:"7d"}
    )
}
userSchema.methods.generateAccesstoken=async function(){
    return jwt.sign({_id:this._id,username:this.username
        ,email:this.email,tokenVersion: this.tokenVersion},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
    )
}
userSchema.methods.isPasswordcorrect=async function(password){
    return await bcrypt.compare(password,this.password)
    
}
const User=mongoose.model("User",userSchema)
module.exports={User}