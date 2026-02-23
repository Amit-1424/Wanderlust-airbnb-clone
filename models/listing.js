const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: "ListingImage",
        url : {
            type: String,
            default: "https://www.shutterstock.com/image-vector/wanderlust-lifestyle-logo-adventure-mountain-design-1542835070",
            set: (v) => v==="" ?"https://www.shutterstock.com/image-vector/wanderlust-lifestyle-logo-adventure-mountain-design-1542835070" : v,
        }
    },
    price: Number,
    loaciton: String,
    country: String
});

const Listing = mongoose.model("Listing",listingSchema);

modeule.exports = Listing;