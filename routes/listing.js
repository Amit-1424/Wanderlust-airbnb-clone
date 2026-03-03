const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const {
    allListings,
    getNewForm,
    createNewListing,
    showListing,
    renderEditForm,
    updateListing,
    destroyListing
} = require("../controllers/allListings.js");


// INDEX + CREATE
router.route("/")
    .get(wrapAsync(allListings))
    .post(
        isLoggedIn,
        validateListing,
        wrapAsync(createNewListing)
    );


// NEW FORM
router.get("/new", isLoggedIn, getNewForm);


// SHOW
router.route("/:id")
    .get(wrapAsync(showListing))
    .put(
        isLoggedIn,
        isOwner,
        validateListing,
        wrapAsync(updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(destroyListing)
    );


// EDIT FORM
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(renderEditForm)
);

module.exports = router;