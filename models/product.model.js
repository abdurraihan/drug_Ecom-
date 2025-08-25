const mongoose = require("mongoose");

const priceOptionSchema = new mongoose.Schema({
  unit: String,
  price: Number,
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: {
    type: String,
    enum: [
      "flower", "tier-1-(EXOTIC)", "tier-2-(TOP-SHELF)", "tier-3-(CHEAP)",
      "snowcaps", "moonrocks", "pre-rolls", "extracts", "edibles", "vapes"
    ]
  },
  type: {
    type: String,
    enum: [
      "jar", "packwood", "sluggers", "shatter", "sugar", "live-resin",
      "hash-rosin", "badder", "cartridges", "disposables", "live-resin-pens"
    ]
  },
  tag:String,
  discount:Number,
  priceOptions: [priceOptionSchema],
  photoUrls: [String],
  videoUrls: [String],
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
