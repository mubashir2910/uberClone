import React, {useState,useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [color,setColor] = useState("");
  const [plate,setPlate] = useState("");  
  const [capacity,setCapacity] = useState("");
  const [vehicleType,setVehicleType] = useState("");
  const [password,setPassword] = useState(""); 

  const navigate = useNavigate();
  const {captain, setCaptain} = useContext(CaptainDataContext);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const newCaptain = {
    fullName:{firstName:firstName,lastName:lastName},
    email:email,
    vehicle:{color:color,plate:plate,capacity:capacity,vehicleType:vehicleType},
    password:password
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,newCaptain);
    if(response.status === 201){
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captains/home');
    }

    setFirstName("");
    setLastName(""); 
    setEmail("");
    setColor("");
    setPlate("");
    setCapacity("");
    setVehicleType("");
    setPassword(""); 
    
  }

  return (
    <div className="min-h-screen flex flex-col justify-between p-8">
      
      {/* Top/Form Section */}
      <div>
        <img
          className="w-20 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <h3 className="text-lg font-medium mb-2">What's your name?</h3>
          <div className="flex gap-4 mb-4">
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First Name"
              className="bg-gray-200 w-3/5 rounded-md px-4 py-2 border text-lg"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last Name"
              className="bg-gray-200 w-2/5 rounded-md px-4 py-2 border text-lg"
            />
          </div>

          {/* Email */}
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email@example.com"
            className="bg-gray-200 rounded-md px-4 py-2 mb-4 border w-full text-lg"
          />

          {/* Vehicle Info */}
          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-4">
            <input
              required
              value={color}
              onChange={(e) => setColor(e.target.value)}
              type="text"
              placeholder="Vehicle Color"
              className="bg-gray-200 w-1/2 rounded-md px-4 py-2 border text-lg"
            />
            <input
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              type="text"
              placeholder="Vehicle Plate"
              className="bg-gray-200 w-1/2 rounded-md px-4 py-2 border text-lg"
            />
          </div>

          <div className="flex gap-4 mb-4">
            <input
              required
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              type="number"
              placeholder="Capacity"
              className="bg-gray-200 w-1/2 rounded-md px-4 py-2 border text-lg"
            />
            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-gray-200 w-1/2 rounded-md px-4 py-2 border text-lg"
            >
              <option value="">Select Vehicle Type</option>
              <option value="Car">Car</option>
              <option value="Motorcycle">Motorcycle</option>
              <option value="Auto">Auto</option>
            </select>
          </div>

          {/* Password */}
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="bg-gray-200 rounded-md px-4 py-2 mb-4 border w-full text-lg"
          />

          <button
            type="submit"
            className="bg-black text-white w-full py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Register as Captain
          </button>
        </form>

        <p className="text-center mt-6">
          Already have an account?&nbsp;
          <Link to="/captains/login" className="text-blue-600 underline">
            Login as Captain
          </Link>
        </p>
      </div>

      {/* Footer Section */}
      <div>
        <div className="border mt-3 border-gray-400"></div>
        <footer className="text-gray-500 text-center mt-3">
          Made with <span className="text-red-500">♥</span> || By Mubashir Iqbal
        </footer>
      </div>
    </div>
  );
}

export default CaptainSignup
