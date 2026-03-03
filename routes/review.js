const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");

const { validateReview, isLoggedIn, isAuthorReview } = require("../middleware.js");

const { createReview, destroyReview } = require("../controllers/reviews.js");


// CREATE Review
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(createReview)
);


// DELETE Review
router.delete(
    "/:reviewId",
    isLoggedIn,
    isAuthorReview,
    wrapAsync(destroyReview)
);

module.exports = router;