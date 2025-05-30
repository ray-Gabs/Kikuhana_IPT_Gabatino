const express = require("express");
const router = express.Router();
const controller = require("../controllers/menuCategoryController");
const upload = require("../middleware/upload");


function multerErrorWrapper(multerFn) {
  return (req, res, next) => {
    multerFn(req, res, (err) => {
      if (err) {
        console.error("Multer Error:", err.message);
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  };
}


router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);


router.post(
  "/:categoryId/items",
  multerErrorWrapper(upload.array("images", 10)),
  controller.addItemToCategory
);

router.put(
  "/:categoryId/item/:itemId",
  multerErrorWrapper(upload.array("images", 10)),
  controller.updateItem
);

module.exports = router;
