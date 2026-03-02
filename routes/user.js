const express = require("express");
const router = express.Router();
const User = require("../models/user.js")
const flash = require("connect-flash");

router.get("/signup",(req,res) => {
    res.render("users/signup.ejs");
})

router.post("/signup",async (req,res) => {
    try{
        const {username,email,password} = req.body;
        const newUser = new User ({username,email});
        let registeredUser = await User.register(newUser,password);
        req.flash("sucess","welcome to wanderlust !");
        res.redirect("/listings");
    }catch(e) {
        req.flash("error",e.message);
        console.log(e)
        res.redirect("/signup")
    }

})



module.exports = router;