const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

//storage configuration 
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "diary-uploads",
        allowed_formats: ["jpg", "png", "pdf", "docx"]
    }
});

const upload = multer({ storage });

module.exports = upload;