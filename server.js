require('dotenv').config();
const express = require('express');
const connectDB = require('./shared/middlewares/connect-db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
const hotelRoutes = require('./modules/hotels/routes/hotelRoutes');
const roomRoutes = require('./modules/rooms/routes/roomRoutes');
const guestRoutes = require('./modules/guests/routes/guestRoutes');
const bookingRoutes = require('./modules/bookings/routes/bookingRoutes');

app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/bookings', bookingRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
