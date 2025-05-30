require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const errorHandler = require("./middleware/errorHandler.js");
const connectDB = require("./config/connection.js");
const menuRoutes = require("./routes/menuRoutes.js");

const app = express();


app.use(cors());
app.use(express.json()); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


connectDB().catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1);
});


app.use("/Menu", menuRoutes);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
