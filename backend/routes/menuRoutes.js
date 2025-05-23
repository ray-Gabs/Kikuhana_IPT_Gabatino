const express = require("express");
const router = express.Router();
const controller = require("../controllers/menuCategoryController");
const upload = require("../middleware/upload");

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

router.post("/:categoryId/items", upload.array("images", 10), controller.addItemToCategory);

router.put(
  "/:categoryId/item/:itemId",
  upload.array("images", 10),
  controller.updateItem
);


module.exports = router;
