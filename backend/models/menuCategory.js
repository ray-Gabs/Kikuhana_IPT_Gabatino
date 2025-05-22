const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
});

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number }, // Optional if using variants
  variants: [variantSchema],
});

const menuCategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String },
  items: [menuItemSchema],
});

module.exports = mongoose.model("MenuCategory", menuCategorySchema);
