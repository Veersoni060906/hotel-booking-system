import { useState } from "react";
import { createRoom } from "../services/roomService";

export default function RoomForm({ onAdded }) {
  const [roomNumber, setRoomNumber] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRoom({ roomNumber, type, price: Number(price), available: true });
      setRoomNumber(""); setType(""); setPrice("");
      if (onAdded) onAdded();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating room");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Room</h3>
      <input placeholder="Room Number" value={roomNumber} onChange={e=>setRoomNumber(e.target.value)} required />
      <input placeholder="Type" value={type} onChange={e=>setType(e.target.value)} required />
      <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} required type="number" />
      <button type="submit">Add Room</button>
    </form>
  );
}
