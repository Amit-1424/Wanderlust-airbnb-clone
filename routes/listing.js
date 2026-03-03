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
    destroyListing,
    myListings
} = require("../controllers/allListings.js");

const multer = require("multer")
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })


// INDEX + CREATE
router.route("/")
    .get(wrapAsync(allListings))
    .post(
        isLoggedIn,
        validateListing,
        upload.single('listing[image][url]'),
        wrapAsync(createNewListing)
    );


router.get("/my", 
    isLoggedIn, 
    wrapAsync(myListings)
);
// NEW FORM
router.get("/new", isLoggedIn, getNewForm);


// SHOW
router.route("/:id")
    .get(wrapAsync(showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single('listing[image][url]'),
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