const express = require('express');
const multer = require('multer');
const router = express.Router();



router.get('/createEmployee', (req,res) => {
    res.render('createEmployee')
})


//image upload
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })

router.post('/createEmployee', upload.single('imageupload'), (req, res) => {
    try {
        res.send(req.file);
    } catch (err) {
        res.send(400);
    }
})


module.exports = router;
