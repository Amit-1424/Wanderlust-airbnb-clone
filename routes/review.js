const express = require("express");
const router = express.Router(
    {
        mergeParams:true
    }
);

const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const {validateReview} = require("../middleware.js");

///reviews-post
router.post("/",validateReview, wrapAsync(async (req,res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);

    listing.review.push(newReview);

    await newReview.save();
    await listing.save();

     req.flash("sucess","Review Added");

    res.redirect(`/listings/${id}`);
}));

//delete review
router.delete("/:reviewId",wrapAsync( async (req,res) => {
    let {id,reviewId}= req.params;
    await Listing.findByIdAndUpdate(id, {$pull : {review: reviewId} });
    await Review.findByIdAndDelete(reviewId);
     req.flash("sucess","Review Deleted");
    res.redirect(`/listings/${id}`)
}));

module.exports = router;