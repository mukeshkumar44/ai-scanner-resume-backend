const multer = require('multer')
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const cloudinary=require('../config/cloudinary')

//storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resumes',
    formats:async (req,file)=>"pdf",
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    
  }
})


//filtering the file type
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==="application/pdf"){
        cb(null,true);
    }else{
        cb(new Error("only pdf files are allowed"),false);
    }
}


const upload=multer({storage,fileFilter});
module.exports=upload;