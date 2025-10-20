const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../../data/bookings.json');
const roomsPath = path.join(__dirname, '../../../data/rooms.json');

const readBookings = () => JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const writeBookings = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

const readRooms = () => JSON.parse(fs.readFileSync(roomsPath, 'utf-8'));
const writeRooms = (data) => fs.writeFileSync(roomsPath, JSON.stringify(data, null, 2));

exports.getAllBookings = () => readBookings();

exports.getBookingById = (id) => readBookings().find(b => b.id === id);

exports.addBooking = (booking) => {
  const bookings = readBookings();
  const rooms = readRooms();

  const room = rooms.find(r => r.id === booking.roomId);
  if (!room || !room.isAvailable) return null;

  room.isAvailable = false; // mark as booked
  writeRooms(rooms);

  bookings.push(booking);
  writeBookings(bookings);
  return booking;
};

exports.deleteBooking = (id) => {
  const bookings = readBookings();
  const rooms = readRooms();

  const index = bookings.findIndex(b => b.id === id);
  if (index === -1) return false;

  const room = rooms.find(r => r.id === bookings[index].roomId);
  if (room) room.isAvailable = true; // free up room

  bookings.splice(index, 1);
  writeBookings(bookings);
  writeRooms(rooms);
  return true;
};
