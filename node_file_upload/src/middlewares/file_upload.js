const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, path.join(__dirname,"../uploads"))
    },
    filename: function (req, file, callback) {
      const prefix = Date.now() + Math.random().toString();
      callback(null,prefix + "-" + file.originalname)
    }
  })


  function fileFilter (req, file, callback) {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        callback(null,true)
    }
    else{
        callback(null,false)
    }
  }


// upload.single for single file and upload.any for multiple files
// Const upload. = multer;
module.exports = multer({
    storage,
    fileFilter,
    limits:{
        fileSize:1024*1024*5,
    }
});