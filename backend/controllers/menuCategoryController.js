const menuCategoryService = require("../services/menuCategoryService");

class MenuCategoryController {
  async create(req, res) {
    try {
      const result = await menuCategoryService.createCategory(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const categories = await menuCategoryService.getAllCategories();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const category = await menuCategoryService.getCategoryById(req.params.id);
      if (!category) return res.status(404).json({ message: "Not found" });
      res.json(category);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const updated = await menuCategoryService.updateCategory(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Not found" });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await menuCategoryService.deleteCategory(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async addItemToCategory(req, res) {
    try {
      const { name, price } = req.body;
      const images = req.files.map(file => `/uploads/${file.filename}`);
      const category = await menuCategoryService.getCategoryById(req.params.categoryId);
      if (!category) return res.status(404).json({ message: "Category not found" });

      const newItem = { name, price: parseFloat(price), images };
      category.items.push(newItem);
      await category.save();

      res.status(201).json(category);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateItem(req, res) {
  try {
    const { categoryId, itemId } = req.params;
    const { name, price } = req.body;
    console.log("REQ BODY:", req.body);
    console.log("REQ FILES:", req.files);
    let images;
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => `/uploads/${file.filename}`);
    } else {
      const original = await menuCategoryService.getCategoryById(categoryId);
      const item = original.items.find(i => i._id.toString() === itemId);
      images = item.images; // keep old images
    }

    const updated = await menuCategoryService.updateItemInCategory(categoryId, itemId, {
      name,
      price,
      images
    });

    if (!updated) return res.status(404).json({ message: "Item not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

}

module.exports = new MenuCategoryController();
