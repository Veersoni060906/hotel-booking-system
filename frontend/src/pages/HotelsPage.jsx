import { useEffect, useState } from "react";
import HotelForm from "../components/HotelForm";
import { getHotels, createHotel, deleteHotel } from "../services/hotelService";

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);

  const load = async () => {
    const data = await getHotels();
    setHotels(data);
  };

  const addHotel = async (hotel) => {
    await createHotel(hotel);
    load();
  };

  const removeHotel = async (id) => {
    await deleteHotel(id);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Hotels</h2>

      <HotelForm onSubmit={addHotel} />

      <ul>
        {hotels.map((hotel) => (
          <li key={hotel._id}>
            {hotel.name}
            <button onClick={() => removeHotel(hotel._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelsPage;
