const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin.model.js");



exports.createDefaultAdmin = async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne();

    if (!existingAdmin) {
      const admin = new Admin({
        email: "admin@example.com",
        password: "123456" // plain text (no bcrypt)
      });
      await admin.save();

      console.log("✅ Default admin created: admin@example.com / 123456");
      return res.status(201).json({ message: "Default admin created", admin });
    } else {
      console.log("ℹ️ Admin already exists, skipping default admin creation.");
      return res.status(200).json({ message: "Admin already exists", admin: existingAdmin });
    }
  } catch (error) {
    console.error("❌ Error creating default admin:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password (plain text)
    if (password !== admin.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1d" } // token valid for 1 day
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (email !== "admin@example.com") {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  const admin = await Admin.findOneAndUpdate(
    { email },
    { password: newPassword },
    { new: true }
  );

  if (!admin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  return res.json({ message: "Password updated successfully" });
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New password and confirm password do not match" });
    }

    // Find the admin (assuming only one admin)
    const admin = await Admin.findOne({ email: "admin@example.com" });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check old password
    if (admin.password !== oldPassword) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

