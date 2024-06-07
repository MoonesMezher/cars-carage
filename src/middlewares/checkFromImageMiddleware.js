const array_of_allowed_files = ['png', 'jpeg', 'jpg', 'webp'];
const array_of_allowed_file_types = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

const multer = require('multer');
const randomInts = require('../helpers/generateRandomNumbersToUsernames');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/cars');
    },
    filename: (req, file, cb) => {
        cb(null, randomInts(1, 100000)[0] + Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

const uploadImage = async (req, res, next) => {
    const files = req.files;

    if(!files) {
        return res.status(400).json({ state: "failed", message: "You must select a files as pictures" })        
    }

    files.forEach((file) => {
        const fileExtension = file.originalname.slice(((file.originalname.lastIndexOf('.') - 1) >>> 0) + 2);
    
        if (!array_of_allowed_files.includes(fileExtension)) {
            return res.status(400).json({ state: "failed", message: "Invalid file type" });
        }
    
        if (!file.mimetype.startsWith('image/')) {
            return res.status(400).json({ state: "failed", message: "Invalid image file" });
        }
    });

    next();
}

const uploadImageWhenUpdate = async (req, res, next) => {
    const files = req.files;

    if(!files) {
        next();
    } else {    
        files.forEach((file) => {
            const fileExtension = file.originalname.slice(((file.originalname.lastIndexOf('.') - 1) >>> 0) + 2);
        
            if (!array_of_allowed_files.includes(fileExtension)) {
                return res.status(400).json({ state: "failed", message: "Invalid file type" });
            }
        
            if (!file.mimetype.startsWith('image/')) {
                return res.status(400).json({ state: "failed", message: "Invalid image file" });
            }
        });

        next();
    }
}

module.exports = { upload, uploadImage, uploadImageWhenUpdate };