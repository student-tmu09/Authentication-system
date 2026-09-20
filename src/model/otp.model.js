const mongoose=require("mongoose")

const otpSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        otphash:{
            type:String,
            required:true
        }
    },{
        timestamps:true
    }
)
const Otp=mongoose.model("Otp",otpSchema)

module.exports={Otp}