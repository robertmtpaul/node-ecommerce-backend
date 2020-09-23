const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String}, 
    email: { type: String },
    passwordDigest: {type: String },
    createdAt: { type: Date, default: Date.now },
    admin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema)