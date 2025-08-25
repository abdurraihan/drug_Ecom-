const Category = require("../models/category.model");

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to create category" });
  }
};

// Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// Get Category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    if (name) category.name = name;
    if (description) category.description = description;

    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to update category" });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};

// ================= SUBCATEGORY =================

// Add Subcategory
exports.addSubcategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    category.subcategories.push({ name });
    await category.save();

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to add subcategory" });
  }
};

// Update Subcategory
exports.updateSubcategory = async (req, res) => {
  try {
    const { subId } = req.params;
    const { name } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    const sub = category.subcategories.id(subId);
    if (!sub) return res.status(404).json({ error: "Subcategory not found" });

    if (name) sub.name = name;

    await category.save();
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to update subcategory" });
  }
};

// Delete Subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const { subId } = req.params;
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    const sub = category.subcategories.id(subId);
    if (!sub) return res.status(404).json({ error: "Subcategory not found" });

    sub.deleteOne();
    await category.save();

    res.json({ message: "Subcategory deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete subcategory" });
  }
};
