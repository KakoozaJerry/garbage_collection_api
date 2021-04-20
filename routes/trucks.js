const express = require("express");
const router = express.Router();
const Truck = require('../models/Trucks')


router.get('/createtruck',(req,res)=>{
    if(req.session.user){
        res.render('createTruck', { title: "Create Truck" })
    }else{
        console.log('Cannot find session');
        res.redirect('/login')
    }
})

router.get('/trucklist', async (req,res)=>{
    if(req.session.user){
        try {
            // find all the data in the Employee collection
            let truckDetails = await Truck.find();
            if (req.query.servicerequest) {
                truckDetails = await Truck.find({ servicerequest: req.query.servicerequest })
            }
            res.render('truckList', { trucks: truckDetails, title: 'Truck List'})
        } catch (err) {
            res.send('Failed to retrive Truck details');
        }
    }else{
        console.log('Cannot find session');
        res.redirect('/login')
    }
})


router.post('/createtruck', async (req, res) => {
    try {
        console.log(req.body)
        const truck = new Truck(req.body);
        await truck.save();
        res.redirect('/truck/trucklist');
    }catch(err){
        console.log(err);
        res.send('Sorry! Something went wrong.');
    }
 });


 router.post('/delete', async (req, res) => {
    try {
        await Truck.deleteOne({ _id: req.body.id })
        res.redirect('back')
    } catch (err) {
        res.status(400).send("Unable to delete item in the database");
    }
})








module.exports = router;