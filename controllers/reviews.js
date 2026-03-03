const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

// Create Review
module.exports.createReview = async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.review.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("sucess", "Review Added");
    res.redirect(`/listings/${id}`);
};


// Delete Review
module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
        $pull: { review: reviewId }
    });

    await Review.findByIdAndDelete(reviewId);

    req.flash("sucess", "Review Deleted");
    res.redirect(`/listings/${id}`);
};