const WaitingForDriverPanel = (props) => {
  return (
  <div>
    <h5 onClick={()=>{
        props.setLookingForDriverPanelOpen(true);
        props.setWaitingForDriverPanelOpen(false)
    }} className='p-1 text-center w-[93%] absolute top-0'>
        <i className="ri-arrow-down-wide-line"></i>
    </h5>
    
      <div className="flex items-center justify-between">
        <img className="h-15 w-15 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiLrMo_t3nLAG8WFPPfUR1RPZI7OWaGszVXg&s"/>
        <div className="text-right">
          <h2 className="text-lg font-medium">Anas Ahsan</h2>
          <h4 className="text-xl font- -mt-1 -mb-1">WB AM 0786</h4>
          <p className="text-sm text-gray-600">Hero Activa 125cc</p>
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center gap-8 pl-4 mb-3">
            <i className="text-2xl ri-user-location-line"></i>
            <div>
                <h3 className="text-xl font-bold">12/H/3/4</h3>
                <p className="text-lg -mt-1 text-gray-600">Munsi Talab, Kolkata</p>
            </div>
        </div>
        <div className="border-b border-gray-300 w-full mb-4"/>

        <div className="flex items-center gap-8 pl-4 mb-3">
            <i className="text-2xl ri-user-location-fill"></i>
            <div>
                <h3 className="text-xl font-bold">9/B/4</h3>
                <p className="text-lg -mt-1 text-gray-600">PW Vidayalaya, Kolkata</p>
            </div>
        </div>
        <div className="border-b border-gray-300 w-full mb-4"/>

        <div className="flex items-center gap-8 pl-4 mb-10">
            <i className="text-2xl ri-bank-card-2-fill"></i>
            <div>
                <h3 className="text-xl font-bold">₹69.3</h3>
                <p className="text-lg -mt-1 text-gray-600">Cash</p>
            </div>            
        </div>

      </div>

  </div>
    
  )
}

export default WaitingForDriverPanel
