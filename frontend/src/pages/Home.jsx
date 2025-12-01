import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div>
      <h1>Hotel Booking System</h1>
      <nav>
        <Link to="/guests">Guests</Link> | <Link to="/rooms">Rooms</Link> | <Link to="/bookings">Bookings</Link>
      </nav>
    </div>
  );
}
