const express = require("express");
const router = express.Router();
const User = require("../models/user.js")
const flash = require("connect-flash");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport")

router.get("/signup",(req,res) => {
    res.render("users/signup.ejs");
})

router.post("/signup", wrapAsync( async (req,res) => {
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
}));
router.get("/login",(req,res) => {
    res.render("users/login.ejs");
})

router.post("/login",
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true
    }),    
    wrapAsync( async (req,res) => {
        console.log("hello")
        let {username} = req.body;
        req.flash("sucess",` welcome Back ${username} `)
        res.redirect("/listings");
}));

module.exports = router;