const mongoose = require("mongoose");
const MenuCategory = require("../models/menuCategoryModel");

class MenuCategoryRepository {
  async create(data) {
    return await MenuCategory.create(data);
  }

  async findAll() {
    return await MenuCategory.find();
  }

  async findById(id) {
    return await MenuCategory.findById(id);
  }

  async update(id, data) {
    return await MenuCategory.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await MenuCategory.findByIdAndDelete(id);
  }

  async updateItem(categoryId, itemId, updatedItem) {
    return await MenuCategory.findOneAndUpdate(
      { _id: categoryId, "items._id": itemId },
      {
        $set: {
          "items.$.name": updatedItem.name,
          "items.$.price": updatedItem.price,
          "items.$.images": updatedItem.images,
        },
      },
      { new: true }
    );
  }
}

module.exports = new MenuCategoryRepository();
