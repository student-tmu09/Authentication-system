require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs')

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadoncloudinary=async(localfilepath)=>{
    if(!localfilepath){
        return null
    }
   try{
      const response= await cloudinary.uploader.upload(localfilepath,{resource_type:"auto"})
      fs.unlinkSync(localfilepath)
      return response

   }catch(error){
        console.error("Cloudinary Upload Error:", error);
        if(fs.existsSync(localfilepath)){
        fs.unlinkSync(localfilepath)
         }
        return null
   }
}
module.exports={uploadoncloudinary}