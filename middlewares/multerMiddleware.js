const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, './uploads')
    },
    filename : (req, file, callback) => {
        callback(null, `Image-${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req, file, callback) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg'){
        callback(null, true);
    }else{
        callback(new Error("Only JPG and PNG files are allowed"), false);
    }
}

const multerMiddleware = multer({
    storage, fileFilter
})

module.exports = multerMiddleware;