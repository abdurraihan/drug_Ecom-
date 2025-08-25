const Type = require("../models/type.model");

// ✅ Create single type
exports.createType = async (req, res) => {
  try {
    
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newType = new Type({ name });
    await newType.save();

    res.status(201).json(newType);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Type name already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all types
exports.getTypes = async (req, res) => {
  try {
    const types = await Type.find();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get single type by ID
exports.getTypeById = async (req, res) => {
  try {
    const type = await Type.findById(req.params.id);
    if (!type) return res.status(404).json({ message: "Type not found" });

    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update single type
exports.updateType = async (req, res) => {
  try {
    const { name } = req.body;

    const updatedType = await Type.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedType) {
      return res.status(404).json({ message: "Type not found" });
    }

    res.status(200).json(updatedType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete single type
exports.deleteType = async (req, res) => {
  try {
    const deletedType = await Type.findByIdAndDelete(req.params.id);

    if (!deletedType) {
      return res.status(404).json({ message: "Type not found" });
    }

    res.status(200).json({ message: "Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
