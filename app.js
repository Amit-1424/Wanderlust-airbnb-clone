const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const ejsMate = require("ejs-mate")
app.engine("ejs",ejsMate)
app.set("view engine", "ejs");  
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"/public")));

var methodOverride = require('method-override')
app.use(methodOverride('_method'))

const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(MONGO_URL);
}
main()
    .then(() => {
        console.log("connected to db");
    })
    .catch(() => {
        console.log("some error occured");
    })


const Listing = require("./models/listing.js");

app.get("/",(req,res) => {
    res.send("hello i am rooot !")
});
//index
app.get("/listings", async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
})

//new / create
app.get("/listings/new", (req,res) => {
    res.render("listings/new.ejs");
})
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});
//show/ read
app.get("/listings/:id", async (req,res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})
//update
app.get("/listings/:id/edit", async (req,res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
})
app.put("/listings/:id", async (req,res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(
        id,
        req.body.listing,
        {
            runValidators: true,
            new: true
        }
    );
    res.redirect(`/listings/${id}`);
});
//delete
app.delete("/listings/:id",async(req,res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings")
})










app.listen(port,() => {
    console.log(`the server is listning at  http://localhost:${port}`);
})