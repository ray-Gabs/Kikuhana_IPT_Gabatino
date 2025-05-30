const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get all users
router.get("/", userController.getAllUsers);   

// User registration route
router.post("/", userController.registerUser);  
// User login route
router.post("/login", userController.loginUser); 
// Edit user profile route
router.put("/edit", userController.editUser);  
// Delete user route
router.delete("/:userId", userController.deleteUser);  

module.exports = router;
