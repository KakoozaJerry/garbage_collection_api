const express = require("express");
const router = express.Router();

router.get('/homepage',(req,res)=>{
    if(req.session.user){
        res.render('homepage', { title: "Home Page" })
    }else{
        console.log('Cannot find session');
        res.redirect('/login')
    }
})





module.exports = router;