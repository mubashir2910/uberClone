import { createContext, useState } from "react";

export const VehicleTypeContext = createContext();

export const VehicleTypeProvider = ({children})=>{
    const [vehicleType, setVehicleType] = useState(null);

    return(
        <VehicleTypeContext.Provider value={{vehicleType, setVehicleType}}>
            {children}
        </VehicleTypeContext.Provider>
    )
}