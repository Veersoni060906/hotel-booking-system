import React, { useEffect, useState } from "react";
import { getGuests, createGuest, deleteGuest } from "../services/guestService";

const GuestsPage = () => {
  const [guests, setGuests] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getGuests();
    setGuests(data);
  };

  const addGuest = async (e) => {
    e.preventDefault();
    await createGuest(form);
    setForm({ name: "", email: "", phone: "" });
    load();
  };

  const removeGuest = async (id) => {
    await deleteGuest(id);
    load();
  };

  return (
    <div>
      <h2>Guests</h2>

      <form onSubmit={addGuest}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <button>Add Guest</button>
      </form>

      <ul>
        {guests.map((g) => (
          <li key={g._id}>
            {g.name} - {g.email} - {g.phone}
            <button onClick={() => removeGuest(g._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuestsPage;
