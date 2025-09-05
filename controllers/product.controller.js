const Product = require("../models/product.model");
// const { uploadToFTP } = require("../services/ftp.service");
// const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");
const path = require("path");

exports.createProduct = async (req, res) => {
  try {
    // Trim all values in req.body
    const cleanedBody = {};
    for (const key in req.body) {
      if (Object.hasOwn(req.body, key)) {
        cleanedBody[key.trim()] =
          typeof req.body[key] === "string"
            ? req.body[key].trim()
            : req.body[key];
      }
    }

    const {
      name,
      description,
      category,
      type,
      tag,
      discount,
      dealofftheweek,
      bestSeller,
    } = cleanedBody;

    // Parse priceOptions
    let priceOptions = [];
    if (cleanedBody.priceOptions) {
      try {
        priceOptions = JSON.parse(cleanedBody.priceOptions);
      } catch (err) {
        return res.status(400).json({ error: "Invalid priceOptions format" });
      }
    }

    const photoUrls = [];
    const videoUrls = [];

    for (const file of req.files["photos"] || []) {
      const url = `${process.env.FTP_PUBLIC_URL}/${file.filename}`;
      photoUrls.push(url);
    }
    for (const file of req.files["videos"] || []) {
      const url = `${process.env.FTP_PUBLIC_URL}/${file.filename}`;
      videoUrls.push(url);
    }

    const newProduct = await Product.create({
      name,
      description,
      category,
      type,
      tag,
      discount,
      dealofftheweek,
      bestSeller,
      priceOptions,
      photoUrls,
      videoUrls,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ Create product error:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
};

exports.getAllProducts = async (req, res) => {
  const { search = "", page = 1, limit = 10 } = req.query;
  // const limit = 10;
  const skip = (page - 1) * limit;

  const query = search
    ? { name: { $regex: search, $options: "i" } } // case-insensitive search
    : {};

  try {
    const products = await Product.find(query).skip(skip).limit(limit);
    const total = await Product.countDocuments(query);

    res.json({
      data: products,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    console.error("❌ Get all products error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

/// get prouct by id

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("🆔 Requested ID:", id);

    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    // No ObjectId check here since IDs are strings
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (err) {
    console.error("❌ Get product by ID error:", err);
    return res.status(500).json({ error: "Failed to fetch product" });
  }
};

/// get product by id end

exports.getProductsByCategory = async (req, res) => {
  const { category } = req.params;

  const { page = 1 } = req.query;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const products = await Product.find({ category }).skip(skip).limit(limit);
    const total = await Product.countDocuments({ category });

    res.json({
      data: products,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    console.error("❌ Get products by category error:", err);
    res.status(500).json({ error: "Failed to fetch category products" });
  }
};

exports.getDealOffTheWeek = async (req, res) => {
  const { page = 1 , limit =10 } = req.query;
  // const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const dealOffTheWeekProducts = await Product.find({ dealoftheweek: true })
      .skip(skip)
      .limit(limit);
    const total = await Product.countDocuments({ dealoftheweek: true });

    res.json({
      data: dealOffTheWeekProducts,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    console.error("❌ Get products by dealOffTheWeekProducts error:", err);
    res.status(500).json({ error: "Failed to fetch category products" });
  }
};

exports.toggleDealOfTheWeek = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
console.log(product);
    await Product.updateOne(
      { _id: id },
      { $set: { dealoftheweek: !product.dealoftheweek } }
    );

    res.json({
      message: `Product dealoftheweek set to ${!product.dealoftheweek}`,
    });
  } catch (err) {
    console.error("❌ Toggle dealoftheweek error:", err);
    res.status(500).json({ error: "Failed to update dealoftheweek status" });
  }
};

exports.getBestSeller = async (req, res) => {
  const { page = 1 , limit =10 } = req.query;
  // const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const bestSellingProducts = await Product.find({ bestSeller: true })
      .skip(skip)
      .limit(limit);
    const total = await Product.countDocuments({ bestSeller: true });

    res.json({
      data: bestSellingProducts,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    console.error("❌ Get products by bestSellingProducts error:", err);
    res.status(500).json({ error: "Failed to fetch category products" });
  }
};

exports.toggleBestSeller= async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
console.log(product);
    await Product.updateOne(
      { _id: id },
      { $set: { bestSeller: !product.bestSeller } }
    );

    res.json({
      message: `Product bestSeller set to ${!product.bestSeller}`,
    });
  } catch (err) {
    console.error("❌ Toggle bestSellererror:", err);
    res.status(500).json({ error: "Failed to update bestSeller status" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Trim all values from req.body
    const cleanedBody = {};
    for (const key in req.body) {
      if (Object.hasOwn(req.body, key)) {
        cleanedBody[key.trim()] =
          typeof req.body[key] === "string"
            ? req.body[key].trim()
            : req.body[key];
      }
    }

    const { name, description, category, type } = cleanedBody;

    if (name) product.name = name;
    if (description) product.description = description;
    if (category) product.category = category;
    if (type) product.type = type;

    // Parse priceOptions if provided
    if (cleanedBody.priceOptions) {
      try {
        product.priceOptions = JSON.parse(cleanedBody.priceOptions);
      } catch (err) {
        return res.status(400).json({ error: "Invalid priceOptions format" });
      }
    }

    // Add new photo URLs (append)
    if (req.files["photos"]) {
      for (const file of req.files["photos"]) {
        const url = `${process.env.FTP_PUBLIC_URL}/${file.filename}`;
        product.photoUrls.push(url);
      }
    }

    // Add new video URLs (append)
    if (req.files["videos"]) {
      for (const file of req.files["videos"]) {
        const url = `${process.env.FTP_PUBLIC_URL}/${file.filename}`;
        product.videoUrls.push(url);
      }
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.error("❌ Update product error:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ error: "Delete failed" });
  }
};
