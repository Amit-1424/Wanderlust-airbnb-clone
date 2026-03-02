const express = require("express");
const router = express.Router(
    {
        mergeParams:true
    }
);

const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const {validateReview,isLoggedIn,isAuthorReview} = require("../middleware.js");

///reviews-post
router.post("/",
    isLoggedIn,
    validateReview, 
    wrapAsync(async (req,res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.review.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("sucess","Review Added");

    res.redirect(`/listings/${id}`);
}));

//delete review
router.delete(
    "/:reviewId",
    isLoggedIn,
    isAuthorReview,
    wrapAsync( async (req,res) => {
    let {id,reviewId}= req.params;
    await Listing.findByIdAndUpdate(id, {$pull : {review: reviewId} });
    await Review.findByIdAndDelete(reviewId);
     req.flash("sucess","Review Deleted");
    res.redirect(`/listings/${id}`)
}));

module.exports = router;