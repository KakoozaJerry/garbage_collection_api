const express = require("express");
const router = express.Router();


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
            let orderDetails = await Order.find();
            if (req.query.servicerequest) {
                orderDetails = await Order.find({ servicerequest: req.query.servicerequest })
            }
            res.render('orderList', { orders: orderDetails, title: 'Order List'})
        } catch (err) {
            res.send('Failed to retrive employee details');
        }
    }else{
        console.log('Cannot find session');
        res.redirect('/login')
    }
})












module.exports = router;