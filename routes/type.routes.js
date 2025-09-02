const express = require("express");
const router = express.Router();
const typeController = require("../controllers/type.controller");
const {verifyAdmin} = require("../middleware/authMiddleware")
// Routes
router.post("/",verifyAdmin, typeController.createType); // Add single type
router.get("/", typeController.getTypes); // Get all
router.get("/:id", typeController.getTypeById); // Get one
router.put("/:id",verifyAdmin, typeController.updateType); // Update one
router.delete("/:id",verifyAdmin, typeController.deleteType); // Delete one

module.exports = router;
