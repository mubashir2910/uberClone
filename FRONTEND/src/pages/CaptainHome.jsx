import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

const CaptainHome = () => {
  const ridePopUpRef = useRef(null);
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);

  const confirmRidePopUpRef = useRef(null);
  const [confirmRidePopUpPanel,setConfirmRidePopUpPanel] = useState(false);

 

  useGSAP(()=>{
    gsap.to(ridePopUpRef.current,{
      y: ridePopUpPanel? "0%" : "100%",
    })
  },[ridePopUpPanel])

    useGSAP(()=>{
    gsap.to(confirmRidePopUpRef.current,{
      y: confirmRidePopUpPanel? "0%" : "100%",
    })
  },[confirmRidePopUpPanel])



  return (
    <div className="h-screen">
        <img
          className="w-16 absolute left-5 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />

        <Link className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
            to='/captains/login'>
            <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>

        <div className="h-5/8">
            <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="temp Map"
            />
        </div>

        <div className="h-3/8 p-6"> 
        <CaptainDetails/>
          
        </div>

        <div ref={ridePopUpRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-8'> 
          <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
        </div>  

        <div ref={confirmRidePopUpRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full  bg-white px-3 py-8'> 
          <ConfirmRidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
        </div>


    </div>


  )
}

export default CaptainHome
