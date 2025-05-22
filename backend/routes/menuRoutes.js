const express = require("express");
const router = express.Router();
const { createMenuCategory, getAllMenu } = require("../controllers/menuController");

// POST new menu category
router.post("/", createMenuCategory);

// GET all menu categories
router.get("/", getAllMenu);

module.exports = router;
