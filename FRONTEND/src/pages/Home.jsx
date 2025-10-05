import { useRef, useState } from 'react';
import axios from 'axios';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import { Link } from 'react-router-dom';

import LocationSearchPanel from '../components/LocationSearchPanel';
import SelectVehiclePanel from '../components/SelectVehiclePanel';
import ConfirmVehiclePanel from '../components/ConfirmVehiclePanel';
import LookingForDriverPanel from '../components/LookingForDriverPanel';
import WaitingForDriverPanel from '../components/WaitingForDriverPanel';

import { FareContext } from '../context/FareContext';
import { useContext } from 'react';
import { VehicleTypeContext } from '../context/VehicleTypeContext';
import { UserDataContext } from '../context/UserContext';

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [activeField, setActiveField] = useState(null);

  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const hideIcon = useRef(null);

  const vehiclePanelRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);

  const vehicleDetailsPanelRef = useRef(null);
  const [vehicleDetailsPaneOpen, setVehicleDetailsPanelOpen] = useState(false);

  const lookingForDriverRef = useRef(null);
  const [lookingForDriverPanelOpen, setLookingForDriverPanelOpen] = useState(false);

  const waitingForDriverRef = useRef(null);
  const [waitingForDriverPanelOpen, setWaitingForDriverPanelOpen] = useState(false);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  // const [vehicleType, setVehicleType] = useState(null);

  const {vehicleType, setVehicleType} = useContext(VehicleTypeContext);
  const { fare } = useContext(FareContext);
  // console.log(vehicleType);

  const[user] = useContext(UserDataContext)
  console.log(user);
  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);

    if (value.length < 2) {
      setPickupSuggestions([]);
      setDestinationSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/getSuggestions`, {
        params: { input: value },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPickupSuggestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);

    if (value.length < 2) {
      setDestinationSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/getSuggestions`, {
        params: { input: value },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setDestinationSuggestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        { pickup, destination, vehicleType },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // GSAP Animations
  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? "70%" : "0%",
      padding: panelOpen ? "24px" : "0px",
    });
    gsap.to(hideIcon.current, { opacity: panelOpen ? 1 : 0 });
  }, [panelOpen]);

  useGSAP(() => { gsap.to(vehiclePanelRef.current, { y: vehiclePanelOpen ? "0%" : "100%" }); }, [vehiclePanelOpen]);
  useGSAP(() => { gsap.to(vehicleDetailsPanelRef.current, { y: vehicleDetailsPaneOpen ? "0%" : "100%" }); }, [vehicleDetailsPaneOpen]);
  useGSAP(() => { gsap.to(lookingForDriverRef.current, { y: lookingForDriverPanelOpen ? "0%" : "100%" }); }, [lookingForDriverPanelOpen]);
  useGSAP(() => { gsap.to(waitingForDriverRef.current, { y: waitingForDriverPanelOpen ? "0%" : "100%" }); }, [waitingForDriverPanelOpen]);

  const handleSubmit = (e) => e.preventDefault();

  return (
    <Link to="/home" state={[user]}>
      <div className="h-screen relative overflow-hidden">
      {/* Logo */}
      <img className="w-16 absolute left-5 top-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />

      {/* Map */}
      <div className="h-screen w-screen">
        <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Map" />
      </div>

      {/* Bottom Panel */}
      <div className="flex flex-col justify-end h-screen absolute bottom-0 w-full">
        <div className="relative h-[30%] p-5 bg-white">
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <h5 ref={hideIcon} onClick={() => setPanelOpen(false)} className="absolute opacity-0 right-6 top-6 text-2xl">
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <div className="absolute h-16 w-1 bg-gray-600 rounded-full left-10 top-[43%]"></div>

          <form onSubmit={handleSubmit}>
            <input
              onClick={() => { setPanelOpen(true); setActiveField("pickup"); }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-gray-200 px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              onClick={() => { setPanelOpen(true); setActiveField("destination"); }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-gray-200 px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter a destination"
            />
          </form>
        </div>

        <div ref={panelRef} className="h-0 bg-gray-100">
          <LocationSearchPanel
            suggestions={activeField === "pickup" ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            pickup={pickup}
            destination={destination}
            activeField={activeField}
          />
        </div>
      </div>

      {/* Vehicle Panel */}
      <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8">
        <SelectVehiclePanel
          fare={fare}
          setPanelOpen={setPanelOpen}
          setVehiclePanelOpen={setVehiclePanelOpen}
          setVehicleDetailsPanelOpen={setVehicleDetailsPanelOpen}
          setVehicleType={setVehicleType}
        />
      </div>

      {/* Vehicle Details */}
      <div ref={vehicleDetailsPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8">
        <ConfirmVehiclePanel
          setVehiclePanelOpen={setVehiclePanelOpen}
          setVehicleDetailsPanelOpen={setVehicleDetailsPanelOpen}
          setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
        />
      </div>

      <div ref={lookingForDriverRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8">
        <LookingForDriverPanel
          setPanelOpen={setPanelOpen}
          setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>

      <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8">
        <WaitingForDriverPanel
          setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}
          setWaitingForDriverPanelOpen={setWaitingForDriverPanelOpen}
        />
      </div>
    </div>
    </Link>

  );
};

export default Home;
