const express = require("express");
const router = express.Router();
const categoryCtrl = require("../controllers/category.controller");
const {verifyAdmin} = require("../middleware/authMiddleware")
// Category
router.post("/",verifyAdmin, categoryCtrl.createCategory);
router.get("/", categoryCtrl.getAllCategories);
router.get("/:id", categoryCtrl.getCategoryById);
router.patch("/:id",verifyAdmin, categoryCtrl.updateCategory);
router.delete("/:id",verifyAdmin, categoryCtrl.deleteCategory);

// Subcategory
router.post("/:id/subcategories",verifyAdmin, categoryCtrl.addSubcategory);
router.patch("/:id/subcategories/:subId",verifyAdmin, categoryCtrl.updateSubcategory);
router.delete("/:id/subcategories/:subId",verifyAdmin, categoryCtrl.deleteSubcategory);

module.exports = router;
