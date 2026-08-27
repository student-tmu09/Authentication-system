const mongoose=require("mongoose")


const ConnectDatabase=async(req,res)=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("server connected to database")
    }catch(error){
        console.log("Mongodb connection error",error.message)
        process.exit(1)
    }

}
module.exports={ConnectDatabase}