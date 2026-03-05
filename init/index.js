require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const intiData = require("./data.js");

const MONGO_URL = process.env.MONGO_URL;

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
.then(async () => {
    console.log("connected to db");
    await initDB();
})
.catch((err) => console.log(err));

const initDB = async () => {
    intiData.data = intiData.data.map((obj) => ({
        ...obj,
        owner: "69a9261c5edb46bfba38cd26"
    }));

    await Listing.insertMany(intiData.data);
    console.log("data was initialised");
};