const SelectVehiclePanel = ({ fare, setVehiclePanelOpen, setVehicleDetailsPanelOpen, setVehicleType, setPanelOpen }) => {
  return (
    <div>
      <h5
        onClick={() => { setVehiclePanelOpen(false); setPanelOpen(true)}}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-xl font-semibold mb-5 text-center">Choose a Vehicle</h3>

      {/* Car */}
      <div
        onClick={() => { setVehicleDetailsPanelOpen(true); setVehiclePanelOpen(false); setVehicleType("Car"); }}
        className="flex border-2 border-gray-200 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
      >
        <img className="h-10" src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Car" />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
        </div>
        <h2 className="text-lg font-semibold">₹{fare.Car || "..."}</h2>
      </div>

      {/* Motorcycle */}
      <div
        onClick={() => { setVehicleDetailsPanelOpen(true); setVehiclePanelOpen(false); setVehicleType("Motorcycle"); }}
        className="flex border-2 border-gray-200 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
      >
        <img className="h-10" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="Moto" />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
          <h5 className="font-medium text-sm">1 min away</h5>
          <p className="font-normal text-xs text-gray-600">Affordable bike rides</p>
        </div>
        <h2 className="text-lg font-semibold">₹{fare.Motorcycle || "..."}</h2>
      </div>

      {/* Auto */}
      <div
        onClick={() => { setVehicleDetailsPanelOpen(true); setVehiclePanelOpen(false); setVehicleType("Auto"); }}
        className="flex border-2 border-gray-200 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
      >
        <img className="h-10" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="Auto" />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">Auto <span><i className="ri-user-3-fill"></i>4</span></h4>
          <h5 className="font-medium text-sm">9 mins away</h5>
          <p className="font-normal text-xs text-gray-600">Affordable auto rides</p>
        </div>
        <h2 className="text-lg font-semibold">₹{fare.Auto || "..."}</h2>
      </div>
    </div>
  );
};

export default SelectVehiclePanel;
