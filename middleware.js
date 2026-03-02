const flash = require("connect-flash")
const Listing = require("./models/listing.js")
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

module.exports.isOwner = async (req,res,next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "you are not the owner of this listing")
        return res.redirect(`/listings/${id}`)
    }
    next();

}