import { useState } from "react";
import { createGuest } from "../services/guestService";

export default function GuestForm({ onAdded }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGuest({ name, phone, email });
      setName(""); setPhone(""); setEmail("");
      if (onAdded) onAdded();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding guest");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Guest</h3>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
      <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <button type="submit">Add</button>
    </form>
  );
}
