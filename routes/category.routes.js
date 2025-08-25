const express = require("express");
const router = express.Router();
const categoryCtrl = require("../controllers/category.controller");

// Category
router.post("/", categoryCtrl.createCategory);
router.get("/", categoryCtrl.getAllCategories);
router.get("/:id", categoryCtrl.getCategoryById);
router.patch("/:id", categoryCtrl.updateCategory);
router.delete("/:id", categoryCtrl.deleteCategory);

// Subcategory
router.post("/:id/subcategories", categoryCtrl.addSubcategory);
router.patch("/:id/subcategories/:subId", categoryCtrl.updateSubcategory);
router.delete("/:id/subcategories/:subId", categoryCtrl.deleteSubcategory);

module.exports = router;
