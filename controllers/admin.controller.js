const Admin = require('../models/admin.model');


// POST /api/admin/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (email !== "admin@example.com") {
    return res.status(403).json({ message: "Access denied" });
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  if (admin.password !== password) {
    return res.status(400).json({ message: "Invalid password" });
  }

  return res.status(200).json({ message: "Login successful" });
};
// POST /api/admin/forgot-password

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