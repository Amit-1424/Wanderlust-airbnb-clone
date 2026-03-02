const flash = require("connect-flash")

module.exports.isLoggedIn = (req,res,next) =>{
    req.session.redirectUrl = req.originalUrl;
    if(!req.isAuthenticated()){
        req.flash("error","you must be logged in")
        return res.redirect("/login")
    }
    else next();
}

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}