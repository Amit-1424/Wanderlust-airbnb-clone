if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

// mongo session store
const MongoStore = require("connect-mongo").default;


// DB
require("./config/db");

// Passport config
require("./config/passport");
require("./config/passportGoogle");

// Routes
const listingsRouter = require("./routes/listing");
const reviewsRouter = require("./routes/review");
const userRouter = require("./routes/user");
const authRoutes = require("./routes/auth");

//app configs
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname,"public")));



const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    crypto:{
        secret: process.env.SESSION_SECRET
    },
    touchAfter: 24*3600,
  })

store.on("error", () => {
    console.log("error in mongo session");
});
//session
const sessionOptions = {
    store : store,
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true
    }
}

app.use(session(sessionOptions));
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());


//global variables
app.use((req,res,next)=>{
    res.locals.sucess = req.flash("sucess");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

//routes
app.get("/",(req,res)=>{
    res.redirect("/listings");
});

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);
app.use("/auth",authRoutes);

//error handeling
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