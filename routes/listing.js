const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");

const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");




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
router.get("/new", (req,res) => {
    res.render("listings/new.ejs");
});

router.post(
    "/",
    validateListing,
    wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));
//show/ read
router.get("/:id", wrapAsync( async (req,res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("review");
    res.render("listings/show.ejs",{listing});
}));
//update
router.get("/:id/edit",wrapAsync(  async (req,res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
}));
router.put(
    "/:id",
    validateListing,
    wrapAsync( async (req,res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id,req.body.listing);
    res.redirect(`/listings/${id}`);
}));
//delete
router.delete("/:id",wrapAsync( async(req,res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings")
}));

module.exports = router;