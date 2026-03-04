const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
   googleId: {
    type: String,
    unique: true,
    sparse: true
  },

  authType: {
    type: String,
    enum: ["local", "google"],
    default: "local"
  }
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

const User = mongoose.model("User", userSchema);

module.exports = User;  