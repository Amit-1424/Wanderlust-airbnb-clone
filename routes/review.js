const express = require("express");
const router = express.Router(
    {
        mergeParams:true
    }
);

const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");

const { reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new expressError (400,errMsg);
    }
    else{
        next();
    }
}


///reviews-post
router.post("/",validateReview, wrapAsync(async (req,res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);

    listing.review.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${id}`);
}));

//delete review
router.delete("/:reviewId",wrapAsync( async (req,res) => {
    let {id,reviewId}= req.params;
    await Listing.findByIdAndUpdate(id, {$pull : {review: reviewId} });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`)
}));

module.exports = router;