const mongoose = require("mongoose");

const priceOptionSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  unit: String,
  price: Number,
});

const productSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() }, // string id
    name: String,
    description: String,
    category: {
      type: String,
     
    },
    type: {
      type: String,
     
    },
    dealoftheweek: Boolean,
    bestSeller: Boolean,
    tag: String,
    discount: Number,
    priceOptions: [priceOptionSchema],
    photoUrls: [String],
    videoUrls: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
