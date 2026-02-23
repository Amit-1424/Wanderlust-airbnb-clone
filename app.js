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


app.get("/",(req,res) => {
    res.send("hello i am rooot !")
});










app.listen(port,() => {
    console.log(`the server is listning at  http://localhost:${port}`);
})