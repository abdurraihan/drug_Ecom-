
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/product.routes");
const announcementRoutes = require("./routes/announcement.routes");
const adminRoutes = require("./routes/admin.routes");
const typeRoutes = require("./routes/type.routes");
const categoryRoutes = require("./routes/category.routes");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/types",typeRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection failed:", err));

