const captainModel = require("../models/captain.model");

module.exports.createCaptain = async({firstName, lastName, email, password,status,color, plate, capacity, vehicleType}) => {
    if(!firstName || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('All feilds are required');
    }

    // Check if captain already exists
    const existingCaptain = await captainModel.findOne({email});
    if (existingCaptain) {
        throw new Error('Captain already exists with this email');
    }  

    const captain = captainModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        status,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    
    return captain;
}