const express = require("express");
const {verifyAdmin} = require("../middleware/authMiddleware")
const router = express.Router();
const { loginAdmin, forgotPassword , changePassword ,createDefaultAdmin } = require("../controllers/admin.controller");

router.post("/createadmin",createDefaultAdmin)
router.post("/login", loginAdmin);
router.post("/forgot-password", forgotPassword);
router.patch("/change-password",verifyAdmin, changePassword);

module.exports = router;

