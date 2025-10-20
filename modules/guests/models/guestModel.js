const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../../data/guests.json');

const readData = () => JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const writeData = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

exports.getAllGuests = () => readData();

exports.getGuestById = (id) => readData().find(g => g.id === id);

exports.addGuest = (guest) => {
  const guests = readData();
  guests.push(guest);
  writeData(guests);
  return guest;
};

exports.updateGuest = (id, updatedGuest) => {
  const guests = readData();
  const index = guests.findIndex(g => g.id === id);
  if (index === -1) return null;
  guests[index] = { ...guests[index], ...updatedGuest };
  writeData(guests);
  return guests[index];
};

exports.deleteGuest = (id) => {
  const guests = readData();
  const index = guests.findIndex(g => g.id === id);
  if (index === -1) return false;
  guests.splice(index, 1);
  writeData(guests);
  return true;
};
