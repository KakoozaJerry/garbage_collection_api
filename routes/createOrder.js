const express = require("express");
const router = express.Router();

router.get('/createOrder',(req,res)=>{
    res.render('createOrder', { title: "Create Order" })
})





module.exports = router;