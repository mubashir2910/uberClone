import { Link } from "react-router-dom"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef , useState} from "react";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
    const finishRideRef = useRef(null);
const [finishRidePanel, setFinishRidePanel] = useState(false);

useGSAP(()=>{
    gsap.to(finishRideRef.current,{
      y: finishRidePanel? "0%" : "100%",
    })
},[finishRidePanel])

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

        <div className="h-6/7">
            <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="temp Map"
            />
        </div>

        <div className="h-1/7 p-6 flex items-center justify-between relative bg-yellow-400 pt-10"> 
            <h5 onClick={()=>{setFinishRidePanel(true)}}
            className=' text-center w-[90%] absolute top-0'>
            <i className="text-3xl text-gray-500 ri-arrow-up-wide-line"></i>
            </h5>          
          <h4 className="text-xl font-semibold">4 Km away</h4>
          <button onClick={()=>{setFinishRidePanel(true)}}
          className="bg-green-500 text-white font-semibold p-3 px-8 rounded-lg">Complete Ride</button>
        </div>

        <div ref={finishRideRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full  bg-white px-3 py-8'> 
          <FinishRide setFinishRidePanel={setFinishRidePanel}/>
        </div>

    </div>
  )
}

export default CaptainRiding
