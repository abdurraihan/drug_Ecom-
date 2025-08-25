const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const multer = require("../middleware/multer");

const upload = multer.fields([
  { name: "photos", maxCount: 5 },
  { name: "videos", maxCount: 3 },
]);

// Routes
router.post("/", upload, productController.createProduct);
router.put("/:id", upload, productController.updateProduct); // ✅ added upload
router.get("/search", productController.getAllProducts); // search product 
router.get("/", productController.getAllProducts);
router.get("/category/:category", productController.getProductsByCategory);
router.delete("/:id", productController.deleteProduct);


module.exports = router;
