const fs = require("fs");
const path = require("path");
const menuCategoryService = require("../services/menuCategoryService");

function deleteImageFile(relativePath) {
  const fullPath = path.join(__dirname, "..", relativePath);
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.warn("Failed to delete file:", fullPath, err.message);
    } else {
      console.log("Deleted file:", fullPath);
    }
  });
}

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
    console.error("Error in getAll:", err); 
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
      const category = await menuCategoryService.getCategoryById(req.params.id);
      if (!category) return res.status(404).json({ message: "Not found" });

      category.items.forEach(item => {
        item.images.forEach(imgPath => deleteImageFile(imgPath));
      });

      await menuCategoryService.deleteCategory(req.params.id);
      res.json({ message: "Deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async addItemToCategory(req, res) {
  try {
    const { name, price, description, variants } = req.body;
    const images = req.files?.map(file =>
      `/uploads/${file.filename}`.replace(/\\/g, "/")
    ) || [];

    const parsedVariants = variants ? JSON.parse(variants) : [];

    const category = await menuCategoryService.getCategoryById(req.params.categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const newItem = {
      name,
      price: price ? parseFloat(price) : undefined, 
      description: description || "",
      images,
      variants: parsedVariants,
    };

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
    const { name, price, description, images: clientImageList, variants } = req.body;

    const category = await menuCategoryService.getCategoryById(categoryId);
    const item = category.items.find(i => i._id.toString() === itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    let images = clientImageList || item.images;

    if (req.files && req.files.length > 0) {
      item.images.forEach(img => deleteImageFile(img));
      images = req.files.map(file =>
        `/uploads/${file.filename}`.replace(/\\/g, "/")
      );
    }

    const parsedVariants = variants ? JSON.parse(variants) : item.variants;

    const updated = await menuCategoryService.updateItemInCategory(categoryId, itemId, {
      name,
      price: price ? parseFloat(price) : undefined, 
      description: description || "",
      images,
      variants: parsedVariants,
    });

    if (!updated) return res.status(404).json({ message: "Update failed" });

    res.json(updated);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ error: err.message });
  }
}

}

module.exports = new MenuCategoryController();
