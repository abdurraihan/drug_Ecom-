const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const multer = require("../middleware/multer");
const {verifyAdmin} = require("../middleware/authMiddleware")

const upload = multer.fields([
  { name: "photos", maxCount: 5 },
  { name: "videos", maxCount: 3 },
]);

//public 
router.get("/search",  productController.getAllProducts);
router.get("/dealoftheweek", productController.getDealOffTheWeek);//deal  // search product 
router.get("/bestselling", productController.getBestSeller);//deal  // search product 
router.get("/:id", productController.getProductById)

router.get("/", productController.getAllProducts);
router.get("/category/:category", productController.getProductsByCategory);

router.patch("/dealoftheweek/:id", productController.toggleDealOfTheWeek);
router.patch("/bestSeller/:id", productController.toggleBestSeller);
//private 
router.post("/",verifyAdmin, upload, productController.createProduct);
router.put("/:id",verifyAdmin, upload,  productController.updateProduct);
router.delete("/:id",verifyAdmin, productController.deleteProduct);


module.exports = router;
