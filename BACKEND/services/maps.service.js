const axios = require("axios");
const apiKey = process.env.MAPBOX_API;

module.exports.getAddressCoordinates = async (address) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${apiKey}&limit=1`;

  try {
    const response = await axios.get(url);

    if (
      response.data &&
      response.data.features &&
      response.data.features.length > 0
    ) {
      const [lng, lat] = response.data.features[0].geometry.coordinates;
      return {
        lat,
        lng,
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw error;
  }
};


module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  try {
    // origin & destination must be coordinates: {lat, lng}
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?geometries=geojson&access_token=${apiKey}`;

    const response = await axios.get(url);
    
    if (
      response.data &&
      response.data.routes &&
      response.data.routes.length > 0
    ) {
      const route = response.data.routes[0];
      return {
        distance: route.distance, // in meters
        duration: route.duration, // in seconds
      };
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (err) {
    console.error("Error fetching distance/time:", err.message);
    throw err;
  }
};

module.exports.getSuggestions = async(input) =>{
  if(!input) throw new Error("Input required for suggestions");

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    input
  )}.json?access_token=${apiKey}&autocomplete=true&limit=5&proximity=88.3639,22.5726`;
  
   try {
    const response = await axios.get(url);

    if (
      response.data &&
      Array.isArray(response.data.features) &&
      response.data.features.length > 0
    ) {
      // Map each feature to a simpler object
      return response.data.features.map(feature => ({
        name: feature.place_name,
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0]
      }));
    } else {
      throw new Error("No suggestions found");
    }
  } catch (err) {
    console.error("Error fetching suggestions:", err.message);
    throw err;
  } 
}




// const axios = require("axios");

// module.exports.getAddressCoordinates = async (address)=>{
//     const apiKey = process.env.MAPBOX_API;
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//       address
//     )}.json?access_token=${apiKey}&limit=1`;

//     try{
//         const response = await axios.get(url);
//         if(response.data.status === 'OK'){
//             const location = response.data.results[0].geometry.coordinates;
//             return{
//                 ltd: location.lat,
//                 lng: location.lng
//             };
//         }else{
//             throw new Error("Unable to fetch coordinates");
//         }
//     }catch(error){
//         console.error(error);
//         throw error;
//     }
// }

// const apiKey = process.env.MAPBOX_API; 
// // 👆 store your token in .env for safety

// module.exports.getAddressCoordinate = async (address) => {
//   try {
//     if (!address) {
//       throw new Error("Address is required");
//     }

    // const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    //   address
    // )}.json?access_token=${apiKey}&limit=1`;

//     const response = await axios.get(url);

//     if (
//       response.data &&
//       response.data.features &&
//       response.data.features.length > 0
//     ) {
//       const [long, lat] = response.data.features[0].geometry.coordinates;
//       return { lat, long };
//     } else {
//       throw new Error("No coordinates found for the given address");
//     }
//   } catch (error) {
//     console.error("Error fetching coordinates:", error.message);
//     throw error;
//   }
// };
