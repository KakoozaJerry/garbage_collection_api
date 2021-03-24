const express = require("express");
const router = express.Router();

router.get('/employeeList',(req,res)=>{
    res.render('employeeList')
})





module.exports = router;