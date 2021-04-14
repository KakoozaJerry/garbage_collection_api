const express = require("express");
const router = express.Router();

router.get('/employeeList',(req,res)=>{
    res.render('employeeList', { title: "Employee List" })
})





module.exports = router;