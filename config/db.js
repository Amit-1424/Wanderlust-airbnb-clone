const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL ;

async function connectDB(){
    try{
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB Connected");
    }catch(err){
        console.log("DB Connection Error",err);
    }
}

connectDB();