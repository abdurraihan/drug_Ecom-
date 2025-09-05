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
      enum: [
        "jar", "packwood", "sluggers", "shatter", "sugar", "live-resin",
        "hash-rosin", "badder", "cartridges", "disposables", "live-resin-pens"
      ],
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
