const express = require("express");
const router = express.Router();
const User = require("../models/user.js")
const flash = require("connect-flash");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup",(req,res) => {
    res.render("users/signup.ejs");
})

router.post("/signup", wrapAsync( async (req,res) => {
    try{
        const {username,email,password} = req.body;
        const newUser = new User ({username,email});
        let registeredUser = await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
               return next(err);
            }
            req.flash("sucess","welcome to wanderlust !");
            res.redirect("/listings");
        })
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
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true
    }),    
    wrapAsync( async (req,res) => {
        let {username} = req.body;
        req.flash("sucess",` welcome Back ${username} `)
        let redirectUrl =  res.locals.redirectUrl || "/listings";
        res.redirect(res.locals.redirectUrl);
}));

router.get("/logout" , (req,res,next) =>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("sucess","you are logged out!");
        res.redirect("/listings");
    })
})

module.exports = router;