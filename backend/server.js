require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const guestRoutes = require("./routes/guestRoutes");
const roomRoutes = require("./routes/roomRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// connect to DB
connectDB();

// routes
app.use("/api/guests", guestRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
