const mangoose = require("mongoose");
const Listing = require("../models/listing.js");
const intiData = require("./data.js");

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

const initDB = async () => {
    await Listing.deleteMany({});
    intiData.data = intiData.data.map((obj) => ({...obj, owner:"69a52284ea747205fbd223ab"}));
    await Listing.insertMany(intiData.data);
    console.log("data was initialised");
} 

initDB();