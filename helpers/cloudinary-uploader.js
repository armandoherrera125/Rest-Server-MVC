const { cloudinary } = require("../config/cloudinary");

const cloudinaryUploader = async () => {
    return new Promise( (resolve, reject) =>{
        cloudinary.uploader.upload_stream();
    });
}

module.exports = cloudinaryUploader;