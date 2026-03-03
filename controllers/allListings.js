const Listing = require("../models/listing.js");

module.exports.allListings = async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}

module.exports.getNewForm = (req,res) => {
    res.render("listings/new.ejs");
}

module.exports.createNewListing = async (req, res) => {
    const newListing = new Listing(req.body.listing);
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
    await Listing.findByIdAndUpdate(id, req.body.listing, { new: true, runValidators: true });
    req.flash("sucess","Listing Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async(req,res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("sucess","Listing deleted");
    res.redirect("/listings")
}