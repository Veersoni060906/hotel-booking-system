import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GuestsPage from "./pages/GuestsPage";
import RoomsPage from "./pages/RoomsPage";
import HotelsPage from "./pages/HotelsPage";
import BookingsPage from "./pages/BookingsPage";
import Home from "./pages/Home";
import "./App.css";


export default function App() {
  return (
    <Router>
      <header>
        <nav>
          <Link to="/">Home</Link>{" | "}
          <Link to="/hotels">Hotels</Link>{" | "}
          <Link to="/guests">Guests</Link>{" | "}
          <Link to="/rooms">Rooms</Link>{" | "}
          <Link to="/bookings">Bookings</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/guests" element={<GuestsPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
        </Routes>
      </main>
    </Router>
  );
}
