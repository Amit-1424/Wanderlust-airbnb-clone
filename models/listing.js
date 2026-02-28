const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  image: {
    filename: {
      type: String,
      default: "ListingImage",
    },
    url: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/wanderlust-lifestyle-logo-adventure-mountain-design-1542835070",
      set: (v) =>
        v === ""
          ? "https://www.shutterstock.com/image-vector/wanderlust-lifestyle-logo-adventure-mountain-design-1542835070"
          : v,
    },
  },

  price: Number,
  location: String,
  country: String,
  review: [
    {
      type: Schema.Types.ObjectId,
      ref : "Review"
    }
  ]
});

listingSchema.post("findOneAndDelete", async(listing) => {
  if(listing){
    await Review.deleteMany({  _id:{$in: listing.review}});
  }
});
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;