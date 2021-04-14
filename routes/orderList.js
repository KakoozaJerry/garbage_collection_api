const express = require("express");
const router = express.Router();

router.get('/orderList',(req,res)=>{
    res.render('orderList', { title: "OrderList" })
})





module.exports = router;