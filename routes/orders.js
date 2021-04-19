const express = require("express");
const router = express.Router();
const Order = require('../models/Orders')


router.get('/createorder',(req,res)=>{
    if(req.session.user){
        res.render('createOrder', { title: "Create Order" })
    }else{
        console.log('Cannot find session');
        res.redirect('/login')
    }
})

router.get('/orderlist', async (req,res)=>{
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


router.post('/createorder', async (req, res) => {
    try {
        console.log(req.body)
        const order = new Order(req.body);
        order.date = new Date();
        await order.save();
        res.redirect('/customer/orderlist');
    }catch(err){
        console.log(err);
        res.send('Sorry! Something went wrong.');
    }
 });

 router.get('/update/:id', async (req, res) => {
    try {
        const updateOrd = await Order.findOne({ _id: req.params.id })
        res.render('updateOrder', { order: updateOrd })
    } catch (err) {
        res.status(400).send("Unable to find item in the database");
    }
})


 router.post('/delete', async (req, res) => {
    try {
        await Order.deleteOne({ _id: req.body.id })
        res.redirect('back')
    } catch (err) {
        res.status(400).send("Unable to delete item in the database");
    }
})



module.exports = router;