const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'public/images/products')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}producto${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage:storage});



module.exports = upload;