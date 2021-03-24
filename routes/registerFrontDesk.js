const express = require("express");
const router = express.Router();

router.get('/registerFrontDesk',(req,res)=>{
    res.render('registerFrontDesk')
})





module.exports = router;