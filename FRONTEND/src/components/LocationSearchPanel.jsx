import axios from "axios";
import { useContext } from "react";
import { FareContext } from "../context/FareContext";

const LocationSearchPanel = ({ suggestions, setVehiclePanelOpen, setPanelOpen, setPickup, setDestination, pickup, destination, activeField }) => {
  const { setFare } = useContext(FareContext);

  const fetchFare = async (origin, dest) => {
    if (!origin || !dest) return;
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { origin, destination: dest },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFare(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
      if (destination) fetchFare(suggestion, destination);
    } else if (activeField === "destination") {
      setDestination(suggestion);
      setVehiclePanelOpen(true);
      setPanelOpen(false);
      if (pickup) fetchFare(pickup, suggestion);
    }
  };

  return (
    <div>
      {suggestions.map((elem, idx) => (
        <div key={idx} onClick={() => handleSuggestionClick(elem.name)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
          <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
          <h4 className='font-medium'>{elem.name}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
