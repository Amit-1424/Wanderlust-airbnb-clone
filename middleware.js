const flash = require("connect-flash")
const Listing = require("./models/listing.js")

const expressError = require("./utils/expressError.js");
const {listingSchema} = require("./schema.js");
const { reviewSchema} = require("./schema.js");

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

    if(!listing){
        req.flash("error","Listing not found");
        return res.redirect("/listings");
    }

    if(!listing.owner.equals(req.user._id)){
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }

    next();
}

module.exports.validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new expressError (400,errMsg);
    }
    else{
        next();
    }
}

module.exports.validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new expressError (400,errMsg);
    }
    else{
        next();
    }
}