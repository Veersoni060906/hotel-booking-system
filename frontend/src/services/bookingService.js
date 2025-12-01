import axios from "axios";

const API_URL = "http://localhost:5000/api/bookings";

export const getBookings = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createBooking = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateBooking = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteBooking = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
