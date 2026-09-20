const AsyncHandler=(fnc)=>async(req,res,next)=>{
    try{
        return await fnc(req,res,next)
    }catch(error){
        res.status(error.code ||500).json({
            success:false,
            message:error.message
        })
    }
}
module.exports = {AsyncHandler}