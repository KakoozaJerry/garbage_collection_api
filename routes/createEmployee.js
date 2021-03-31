const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
//const { check, validationResult } = require('express-validator');

const router = express.Router();
const Employee = require('../models/Employee')
const Registration = require('../models/Registration')
//const Employee = mongoose.model('Employee');


router.get('/', async (req, res) => {
    try {
        // find all the data in the Employee collection
        const employeeDetails = await Employee.find();
        res.render('employeeList', { user: employeeDetails, title: 'Employee List' })
    } catch (err) {
        res.send('Failed to retrive employee details');
    }
})


router.get('/createEmployee', (req,res) => {
    res.render('createEmployee')
    
})

router.get('/registerfrontdesk', (req,res) => {
    res.render('registerFrontDesk')
    
})


router.get('/employeeList',async (req,res)=>{
    try {
        // find all the data in the Employee collection
        let employeeDetails = await Employee.find();
        if (req.query.gender) {
            employeeDetails = await Employee.find({ gender: req.query.gender })
        }
        res.render('employeeList', { users: employeeDetails, title: 'Employee List' })
    } catch (err) {
        res.send('Failed to retrive employee details');
    }

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


router.post('/createEmployee', upload.single('imageupload'), async (req, res) => {
    try {
        console.log(req.body)
        const employee = new Employee(req.body);
        employee.imageupload = req.file.path;
        await employee.save();
        res.redirect('/employee/employeeList');
    }catch(err){
        console.log(err);
        res.send('Sorry! Something went wrong.');
    }
 });

 router.post('/registerfrontdesk', async (req, res) => {
    try {
        const registration = new Registration(req.body);
        await Registration.register(registration, req.body.password, (err) => {
            if (err)
              { 
               throw err
              }
            console.log(req.body)
            res.redirect('/login')
        })
    }catch(err){
        res.status(400).send('Sorry! Something went wrong.')
        console.log(err)
    }
 });


 router.get('/update/:id', async (req, res) => {
    try {
        const updateEmp = await Employee.findOne({ _id: req.params.id })
        res.render('updateEmployee', { user: updateEmp })
    } catch (err) {
        res.status(400).send("Unable to find item in the database");
    }
})

// route to save the updated data
router.post('/update', async (req, res) => {
    try {
        await Employee.findOneAndUpdate({_id:req.query.id}, req.body)
        res.redirect('/employee/employeeList');
    } catch (err) {
        console.log(err)
        res.status(404).send("Unable to update item in the database");
    }
})

router.post('/delete', async (req, res) => {
    try {
        await Employee.deleteOne({ _id: req.body.id })
        res.redirect('back')
    } catch (err) {
        res.status(400).send("Unable to delete item in the database");
    }
})




module.exports = router;
