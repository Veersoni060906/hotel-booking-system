require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const Guest = require("../models/Guest");
const Booking = require("../models/Booking");

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear
    await Booking.deleteMany({});
    await Room.deleteMany({});
    await Guest.deleteMany({});
    await Hotel.deleteMany({});

    // Load JSON
    const hotelsData = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "hotels.json")));
    const roomsData = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "rooms.json")));
    const guestsData = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "guests.json")));
    const bookingsData = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "bookings.json")));

    // Insert hotels & guests
    const hotels = await Hotel.insertMany(hotelsData);
    const guests = await Guest.insertMany(guestsData);

    // Attach hotel refs to rooms (cycle if fewer hotels than rooms)
    const roomsWithHotel = roomsData.map((r, i) => ({ ...r, hotel: hotels[i % hotels.length]._id }));
    const rooms = await Room.insertMany(roomsWithHotel);

    // Create bookings by mapping index references stored in bookings.json
    const bookingDocs = bookingsData.map(b => {
      const guest = guests[b.guestIndex % guests.length]._id;
      const hotel = hotels[b.hotelIndex % hotels.length]._id;
      const room = rooms[b.roomIndex % rooms.length]._id;
      const checkIn = new Date(b.checkIn);
      const checkOut = new Date(b.checkOut);
      const nights = Math.ceil((checkOut - checkIn) / (24*60*60*1000));
      const totalPrice = (rooms[b.roomIndex % rooms.length].price || 0) * Math.max(nights, 1);
      return { guest, hotel, room, checkIn, checkOut, totalPrice };
    });

    const insertedBookings = await Booking.insertMany(bookingDocs);

    // mark rooms used in bookings unavailable
    for (const bk of insertedBookings) {
      await Room.findByIdAndUpdate(bk.room, { available: false });
    }

    console.log("Seed completed:", {
      hotels: hotels.length,
      guests: guests.length,
      rooms: rooms.length,
      bookings: insertedBookings.length
    });
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
};

run();
