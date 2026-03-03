const Listing = require("../models/listing.js");

const { cloudinary } = require("../cloudConfig");

module.exports.allListings = async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}

module.exports.getNewForm = (req,res) => {
    res.render("listings/new.ejs");
}

module.exports.createNewListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.image = {filename,url};
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("sucess","new Listing Created");
    res.redirect("/listings");
}

module.exports.showListing = async (req,res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({
            path:"review",
            populate:{
                path: "author",
            }
        })
        .populate("owner");
    if(!listing){
        req.flash("error","Listing you requestd for does not exists");
        res.redirect("/listings");
    }
    else{
        res.render("listings/show.ejs",{listing});
    }
}

module.exports.renderEditForm = async (req,res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requestd for does not exists");
        res.redirect("/listings");
    }
    else{
        res.render("listings/edit.ejs",{listing})
    }
}

module.exports.updateListing = async (req,res) => {
    let { id } = req.params;

    let oldListing = await Listing.findById(id);

    let listing = await Listing.findByIdAndUpdate(
        id,
        req.body.listing,
        { new: true, runValidators: true }
    );

    if (req.file) {


        if (oldListing.image && oldListing.image.filename && oldListing.image.filename.includes("wanderlust_DEV")) {
            await cloudinary.uploader.destroy(oldListing.image.filename);
        }

        listing.image = {
            filename: req.file.filename,
            url: req.file.path
        };

        await listing.save();
    }

    req.flash("sucess","Listing Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async(req,res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (
        listing.image &&
        listing.image.filename &&
        listing.image.filename.includes("wanderlust_DEV")
    ) {
        await cloudinary.uploader.destroy(listing.image.filename);
    }
    await Listing.findByIdAndDelete(id);
    req.flash("sucess","Listing deleted");
    res.redirect("/listings")
}