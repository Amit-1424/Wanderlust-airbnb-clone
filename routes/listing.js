const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");

const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");


const {isLoggedIn} = require("../middleware.js");


const validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new expressError (400,errMsg);
    }
    else{
        next();
    }
}

//index
router.get("/",wrapAsync(  async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

//new / create
router.get("/new",
    isLoggedIn,
    (req,res) => {
    res.render("listings/new.ejs");
});

router.post(
    "/",
    isLoggedIn,
    validateListing,
    wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("sucess","new Listing Created");
    res.redirect("/listings");
}));
//show/ read
router.get("/:id", wrapAsync( async (req,res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("review").populate("owner");
    if(!listing){
        req.flash("error","Listing you requestd for does not exists");
        res.redirect("/listings");
    }
    else{
        res.render("listings/show.ejs",{listing});
    }
}));
//update
router.get("/:id/edit",
    isLoggedIn,
    wrapAsync(  async (req,res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requestd for does not exists");
        res.redirect("/listings");
    }
    else{
        res.render("listings/edit.ejs",{listing})
    }
}));
router.put(
    "/:id",
    isLoggedIn,
    validateListing,
    wrapAsync( async (req,res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id,req.body.listing);
    req.flash("sucess","Listing Updated");
    res.redirect(`/listings/${id}`);
}));
//delete
router.delete("/:id",
    isLoggedIn,
    wrapAsync( async(req,res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("sucess","Listing deleted");
    res.redirect("/listings")
}));

module.exports = router;