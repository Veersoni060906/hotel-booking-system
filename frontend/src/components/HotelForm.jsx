import { useState } from "react";

const HotelForm = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    onSubmit({ name });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Hotel</h3>
      <input
        type="text"
        placeholder="Hotel name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Hotel</button>
    </form>
  );
};

export default HotelForm;
