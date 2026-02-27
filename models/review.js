const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
    comment : String,
    rating : {
        type: String,
        min: 1,
        max :5
    },
    created_at : {
        type: Date,
        default: DataTransfer.now() 
    },
});

let Review = new mongoose.model("Review",reviewSchema);

module.exports = Review;    