const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../../data/hotels.json');

const readData = () => JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const writeData = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

exports.getAllHotels = () => readData();

exports.getHotelById = (id) => readData().find(h => h.id === id);

exports.addHotel = (hotel) => {
  const hotels = readData();
  hotels.push(hotel);
  writeData(hotels);
  return hotel;
};

exports.updateHotel = (id, updatedHotel) => {
  const hotels = readData();
  const index = hotels.findIndex(h => h.id === id);
  if (index === -1) return null;
  hotels[index] = { ...hotels[index], ...updatedHotel };
  writeData(hotels);
  return hotels[index];
};

exports.deleteHotel = (id) => {
  const hotels = readData();
  const index = hotels.findIndex(h => h.id === id);
  if (index === -1) return false;
  hotels.splice(index, 1);
  writeData(hotels);
  return true;
};
