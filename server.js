const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const hotelRoutes = require('./modules/hotels/routes/hotelRoutes');
const roomRoutes = require('./modules/rooms/routes/roomRoutes');
const bookingRoutes = require('./modules/bookings/routes/bookingRoutes');
const guestRoutes = require('./modules/guests/routes/guestRoutes');

// Use routes
app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/guests', guestRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
