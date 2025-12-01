import { useEffect, useState } from "react";
import api from "../services/api";
import BookingForm from "../components/BookingForm";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  const load = async () => {
    const res = await api.get("/bookings");
    setBookings(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete booking?")) return;
    await api.delete(`/bookings/${id}`);
    load();
  };

  return (
    <div>
      <h2>Bookings</h2>
      <BookingForm onBooked={load} />
      <ul>
        {bookings.map(b => (
          <li key={b._id}>
            {b.guest?.name} - {b.hotel?.name} - Room {b.room?.roomNumber} from {new Date(b.checkIn).toLocaleDateString()} to {new Date(b.checkOut).toLocaleDateString()}
            <button onClick={() => handleDelete(b._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
