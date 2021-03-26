const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Employee = mongoose.model('Employee');



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
    const employee = new Employee(req.body);
    employee.imageupload = req.file.path;
    employee.save()
    .then(() => { res.send('Thank you for your registration!')})
    .catch((err) => {
        console.log(err);
        res.send('Sorry! Something went wrong.');
    })
})



module.exports = router;

