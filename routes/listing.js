const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

const {allListings,getNewForm,createNewListing,showListing,renderEditForm,updateListing,destroyListing} = require("../controllers/allListings.js")

//index
router.get("/",wrapAsync( allListings ));

//new / create
router.get("/new",isLoggedIn,getNewForm);

router.post(
    "/",
    isLoggedIn,
    validateListing,
    wrapAsync(createNewListing));

//show/ read
router.get("/:id", wrapAsync(showListing ));

//update
router.get("/:id/edit",
    isLoggedIn,
    isOwner,    
    wrapAsync(renderEditForm));

router.put(
    "/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync( updateListing));
//delete
router.delete("/:id",
    isLoggedIn,
    isOwner,
    wrapAsync( destroyListing));

module.exports = router;