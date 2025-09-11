
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/product.routes");
const announcementRoutes = require("./routes/announcement.routes");
const adminRoutes = require("./routes/admin.routes");
const typeRoutes = require("./routes/type.routes");
const timeSlot = require("./routes/timeSlot.routes")
const categoryRoutes = require("./routes/category.routes");
const reviwRoutes = require('./routes/review.routes');

const PORT = process.env.PORT || 5000
const path = require("path");
const app = express();

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials:true
}));
app.use(express.json());




app.use("/api/products", productRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/types",typeRoutes);
app.use("/api/timeslot",timeSlot)
app.use("/api/review",reviwRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection failed:", err));

