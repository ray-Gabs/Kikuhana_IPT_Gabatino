require("dotenv").config();

const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler.js");

const connectDB = require("./config/connection.js");

const menuRoutes = require("./routes/menuRoutes.js");
// ✅ Initialize Express app
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

app.use("/Menu", menuRoutes);


// ✅ Error handling middleware (after routes)
app.use(errorHandler);

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
