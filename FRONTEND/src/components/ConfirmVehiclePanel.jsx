const ConfirmVehiclePanel = (props) =>{
return(
  <div>
    <h5 onClick={()=>{
        props.setVehiclePanelOpen(true);
        props.setVehicleDetailsPanelOpen(false);
    }} className='p-1 text-center w-[93%] absolute top-0'>
        <i className="ri-arrow-down-wide-line"></i>
    </h5>
    <h3 className='text-xl text-center font-semibold mb-4'>Confirm your Ride</h3>
    <div className="border-b border-gray-300 w-full mb-4"/>
    <div>      
      <img className='h-20 mx-auto mt-10 mb-10' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
      <div className="border-b border-gray-300 w-full mb-4"/>
      
        <div className="w-full">
        <div className="flex items-center gap-8 pl-4 mb-3">
            <i className="text-2xl ri-user-location-line"></i>
            <div>
                <h3 className="text-xl font-bold">{props.pickup.split(",")[0]}</h3>
                <p className="text-lg -mt-1 text-gray-600">{props.pickup.split(",").slice(1).join(",")}</p>
            </div>
        </div>
        <div className="border-b border-gray-300 w-full mb-4"/>

        <div className="flex items-center gap-8 pl-4 mb-3">
            <i className="text-2xl ri-user-location-fill"></i>
            <div>
                <h3 className="text-xl font-bold">{props.destination.split(",")[0]}</h3>
                <p className="text-lg -mt-1 text-gray-600">{props.destination.split(",").slice(1).join(",")}</p>
            </div>
        </div>
        <div className="border-b border-gray-300 w-full mb-4"/>

        <div className="flex items-center gap-8 pl-4 mb-10">
            <i className="text-2xl ri-bank-card-2-fill"></i>
            <div>
                <h3 className="text-xl font-bold">₹{props.fare[props.vehicleType]}</h3>
                <p className="text-lg -mt-1 text-gray-600">Cash</p>
            </div>            
        </div>
      </div>

      <button onClick={()=>{props.setLookingForDriverPanelOpen(true) ,props.setVehicleDetailsPanelOpen(false),props.createRide()}}
      className="w-full bg-green-500 text-white font-semibold p-2 rounded-xl">Confirm</button>
    </div>
  </div>
)}

export default ConfirmVehiclePanel