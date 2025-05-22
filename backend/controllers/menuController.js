const MenuCategory = require("../models/menuCategory.js");

// CREATE a new menu category with items
const createMenuCategory = async (req, res) => {
  try {
    const { category, description, items } = req.body;

    const newCategory = new MenuCategory({
      category,
      description,
      items,
    });

    await newCategory.save();
    res.status(201).json({ message: "Menu category created", data: newCategory });
  } catch (error) {
    console.error("Error creating menu category:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// GET all menu categories
const getAllMenu = async (req, res) => {
  try {
    const menu = await MenuCategory.find();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { createMenuCategory, getAllMenu };
