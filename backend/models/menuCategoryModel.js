const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
   images: [String], 
});

const menuCategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String },
  items: [menuItemSchema],
});

module.exports = mongoose.model("MenuCategory", menuCategorySchema);
