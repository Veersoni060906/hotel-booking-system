import React, { useEffect, useState } from "react";
import { getRooms, createRoom, deleteRoom } from "../services/roomService";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    roomNumber: "",
    hotel: "",
    capacity: "",
    price: ""
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getRooms();

    // API could return rooms as array or inside object
    setRooms(Array.isArray(data) ? data : data.rooms || []);
  };

  const addRoom = async (e) => {
    e.preventDefault();
    await createRoom(form);
    setForm({ roomNumber: "", hotel: "", capacity: "", price: "" });
    load();
  };

  const removeRoom = async (id) => {
    await deleteRoom(id);
    load();
  };

  return (
    <div>
      <h2>Rooms</h2>

      <form onSubmit={addRoom}>
        <input
          placeholder="Room Number"
          value={form.roomNumber}
          onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
        />

        <input
          placeholder="Hotel ID"
          value={form.hotel}
          onChange={(e) => setForm({ ...form, hotel: e.target.value })}
        />

        <input
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <button>Add Room</button>
      </form>

      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            Room {room.roomNumber} - ${room.price}
            <button onClick={() => removeRoom(room._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomsPage;
