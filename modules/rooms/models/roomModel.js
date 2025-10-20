const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../../data/rooms.json');

const readData = () => JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const writeData = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

exports.getAllRooms = () => readData();

exports.getRoomById = (id) => readData().find(r => r.id === id);

exports.addRoom = (room) => {
  const rooms = readData();
  rooms.push(room);
  writeData(rooms);
  return room;
};

exports.updateRoom = (id, updatedRoom) => {
  const rooms = readData();
  const index = rooms.findIndex(r => r.id === id);
  if (index === -1) return null;
  rooms[index] = { ...rooms[index], ...updatedRoom };
  writeData(rooms);
  return rooms[index];
};

exports.deleteRoom = (id) => {
  const rooms = readData();
  const index = rooms.findIndex(r => r.id === id);
  if (index === -1) return false;
  rooms.splice(index, 1);
  writeData(rooms);
  return true;
};
