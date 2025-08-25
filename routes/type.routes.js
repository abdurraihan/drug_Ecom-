const express = require("express");
const router = express.Router();
const typeController = require("../controllers/type.controller");

// Routes
router.post("/", typeController.createType); // Add single type
router.get("/", typeController.getTypes); // Get all
router.get("/:id", typeController.getTypeById); // Get one
router.put("/:id", typeController.updateType); // Update one
router.delete("/:id", typeController.deleteType); // Delete one

module.exports = router;
