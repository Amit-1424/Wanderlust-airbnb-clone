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

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js")

const session = require("express-session");
const sessionOptions = {
    secret : "mySuperSecretCode",
    resave: "false",
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge :7*24*60*60*1000,
        httpOnly: true
    }
}
app.use(session(sessionOptions));

app.get("/",(req,res) => {
    res.redirect("/listings")
});

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews)



app.use((req,res,next) => {
    throw new expressError(404,"page not found")
})


app.use((err,req,res,next) => {
    let {statusCode = 500, message = "something went wrong"} = err;
    res.status(statusCode).render("listings/error.ejs", {err}); 
});


app.listen(port,() => {
    console.log(`the server is listning at  http://localhost:${port}`);
})