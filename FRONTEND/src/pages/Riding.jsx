import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FareContext } from '../context/FareContext';
import { VehicleTypeContext } from '../context/VehicleTypeContext';

const Riding = () => {
  const {fare} = useContext(FareContext);
  const {vehicleType} = useContext(VehicleTypeContext)
  // console.log(vehicleType);
  return (
    <div className="h-screen">
        <Link className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
            to='/home'>
            <i className="text-lg font-medium ri-home-4-line"></i>
        </Link>

        <div className="h-1/2">
            <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="temp Map"
            />
        </div>

    <div className="h-1/2 p-4"> 

      <div className="flex items-center justify-between">
        <img className="h-12" src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"/>
        <div className="text-right">
          <h2 className="text-lg font-medium">Mubashir Iqbal</h2>
          <h4 className="text-xl font- -mt-1 -mb-1">WB01 AX 7124</h4>
          <p className="text-sm text-gray-600">Hero Activa 125cc</p> 
        </div>
      </div>


      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-9">

            <div className="flex items-center gap-8 pl-4 mb-3">
                <i className="text-2xl ri-user-location-fill"></i>
                <div>
                    <h3 className="text-xl font-bold">9/B/4</h3>
                    <p className="text-lg -mt-1 text-gray-600">PW Vidayalaya, Kolkata</p>
                </div>
            </div>

            <div className="border-b border-gray-300 w-full mb-4"/>

            <div className="flex items-center gap-8 pl-4 mb-6">
                <i className="text-2xl ri-bank-card-2-fill"></i>
                <div>
                    <h3 className="text-xl font-bold">₹{fare[vehicleType]}</h3>
                    <p className="text-lg -mt-1 text-gray-600">Cash</p>
                </div>            
            </div>

        </div>
       </div>

        <button
            className="w-full bg-green-500 text-white font-semibold p-2 rounded-xl">Make a Payment</button>
  </div>
  </div>
  )
}

export default Riding
