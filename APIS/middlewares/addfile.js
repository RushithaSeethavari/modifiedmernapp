//import cloudinary related modules
const cloudinary=require("cloudinary").v2;
const multer=require("multer");
const {CloudinaryStorage}=require("multer-storage-cloudinary");

//configure cloudinary
cloudinary.config({
    cloud_name: 'dslcnxbcs',
    api_key: '451715767688371',
    api_secret: 'ilWxaGPRtsNw0BKhmpa_cB3wZes'
});
//configure cloudinary storage
const clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'CDB21DX003',
            public_key: file.fieldname + '-' + Date.now()
        }
    }
})
//configure multer
const multerObj=multer({storage: clStorage})

module.exports=multerObj;