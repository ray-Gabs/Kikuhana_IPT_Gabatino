const menuCategoryRepo = require("../repositories/menuCategoryRepository");

class MenuCategoryService {
  async createCategory(data) {
    return await menuCategoryRepo.create(data);
  }

  async getAllCategories() {
    return await menuCategoryRepo.findAll();
  }

  async getCategoryById(id) {
    return await menuCategoryRepo.findById(id);
  }

  async updateCategory(id, data) {
    return await menuCategoryRepo.update(id, data);
  }

  async deleteCategory(id) {
    return await menuCategoryRepo.delete(id);
  }

  async updateItemInCategory(categoryId, itemId, updatedItem) {
    return await menuCategoryRepo.updateItem(categoryId, itemId, updatedItem);
  }
}

module.exports = new MenuCategoryService();
