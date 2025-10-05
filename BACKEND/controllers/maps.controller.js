const mapService = require("../services/maps.service");
const {validationResult} = require('express-validator');

module.exports.getCoordinates = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array() });

    try{
        const { address }= req.query;
        const coordinates = await mapService.getAddressCoordinates(address);
        res.status(200).json(coordinates);
    }catch(error){
        console.error(error);
        res.status(400).json({ message: 'Cordinates not found'});
    }
}

module.exports.getDistanceTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

  try {
    const { origin, destination } = req.query;
    console.log("Origin:", origin);
    console.log("Destination:", destination);

    // 1. Convert origin & destination to coordinates
    const originCoords = await mapService.getAddressCoordinates(origin);
    const destinationCoords = await mapService.getAddressCoordinates(destination);

    // 2. Fetch distance & time using Mapbox Directions API
    const result = await mapService.getDistanceTime(originCoords, destinationCoords);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching distance/time:", error.message);
    res.status(400).json({ message: "Unable to fetch distance/time" });
  }
};

module.exports.getSuggestions = async (req, res) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});

  try{
    const {input} = req.query; 

    const suggestions = await mapService.getSuggestions(input);
    res.status(200).json(suggestions);      // send array of suggestion objects
  }catch(err){
    console.log("Error getting suggestions: ", err.message);
    res.status(400).json({message: "Unable to get suggestions"})
  }
}

// module.exports.getDistanceTime = async (req, res) => {
//   try {
//     const { origin, destination } = req.query;

//     if (!origin || !destination) {
//       return res.status(400).json({ message: "Origin and destination query params are required" });
//     }
//     console.log("Origin:", origin);
// console.log("Destination:", destination);


//     // Example query: ?origin=12.9716,77.5946&destination=19.0760,72.8777
//     const [originLat, originLng] = origin.split(",");
//     const [destLat, destLng] = destination.split(",");
    

//     const result = await mapService.getDistanceTime(
//       { lat: parseFloat(originLat), lng: parseFloat(originLng) },
//       { lat: parseFloat(destLat), lng: parseFloat(destLng) }
//     );

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports.getDistanceTime = async (req,res,next) =>{
//     const errors = validationResult(req);
//     if(!errors.isEmpty()) return res.status(400).json({errors: errors.array() });

//     try{
//         const {origin,destination} = req.query;
//         const distanceTime = await mapService.getDistanceTime(origin,destination);
//         res.status(200).json(distanceTime);
//     }catch(error){
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error'})
//     }

// }