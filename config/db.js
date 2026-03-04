const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function connectDB(){
    try{
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB Connected");
    }catch(err){
        console.log("DB Connection Error",err);
    }
}

connectDB();