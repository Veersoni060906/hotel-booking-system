import React, { useEffect, useState } from "react";
import { getHotels } from "../services/hotelService";
import { getGuests } from "../services/guestService";
import { getRooms } from "../services/roomService";
import { createBooking } from "../services/bookingService";

const BookingForm = () => {
  const [hotels, setHotels] = useState([]);
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    hotelId: "",
    guestId: "",
    roomId: "",
    checkIn: "",
    checkOut: "",
  });

  const loadData = async () => {
    try {
      const hotelsData = await getHotels();
      const guestsData = await getGuests();
      const roomsData = await getRooms();

      setHotels(hotelsData);
      setGuests(guestsData);
      setRooms(roomsData);
    } catch (error) {
      console.log("Failed loading data", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBooking(formData);
      alert("Booking Created Successfully!");

      setFormData({
        hotelId: "",
        guestId: "",
        roomId: "",
        checkIn: "",
        checkOut: "",
      });
    } catch (error) {
      alert("Failed to create booking");
    }
  };

  return (
    <div className="form-container">
      <h2>Create a Booking</h2>

      <form onSubmit={handleSubmit}>
        {/* HOTEL SELECT */}
        <label>Select Hotel:</label>
        <select
          name="hotelId"
          value={formData.hotelId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Hotel --</option>
          {Array.isArray(hotels) &&
            hotels.map((h) => (
              <option key={h._id} value={h._id}>
                {h.name}
              </option>
            ))}
        </select>

        {/* GUEST SELECT */}
        <label>Select Guest:</label>
        <select
          name="guestId"
          value={formData.guestId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Guest --</option>
          {Array.isArray(guests) &&
            guests.map((g) => (
              <option key={g._id} value={g._id}>
                {g.firstName} {g.lastName}
              </option>
            ))}
        </select>

        {/* ROOM SELECT */}
        <label>Select Room:</label>
        <select
          name="roomId"
          value={formData.roomId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Room --</option>
          {Array.isArray(rooms) &&
            rooms.map((r) => (
              <option key={r._id} value={r._id}>
                {r.roomNumber} - {r.type}
              </option>
            ))}
        </select>

        {/* DATES */}
        <label>Check-in:</label>
        <input
          type="date"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          required
        />

        <label>Check-out:</label>
        <input
          type="date"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          required
        />

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
