const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: Number,
    brand: String,
    rating: Number,
    numReviews: Number,
    quantity: Number,
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Product", schema)