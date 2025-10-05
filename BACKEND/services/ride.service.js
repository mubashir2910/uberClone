const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

async function getFare(pickup, destination){
    if(!pickup || !destination){
        throw new Error("Pickup and Destination are required");
    }

    // 1. Convert pickup & destination into coordinates
    const pickupCoords = await mapService.getAddressCoordinates(pickup);
    const destinationCoords = await mapService.getAddressCoordinates(destination);

    // 2. Fetch distance & duration
    const distanceTime = await mapService.getDistanceTime(pickupCoords, destinationCoords);

    const baseFare = { Car: 60, Motorcycle: 20, Auto: 30 };
    const perKmRate = { Car: 20, Motorcycle: 6, Auto: 12 };
    const perMintRate = { Car: 1, Motorcycle: 0.4, Auto: 0.8 };

    const fare = {
        Car: Math.round(baseFare.Car + (perKmRate.Car * (distanceTime.distance / 1000)) + (perMintRate.Car * (distanceTime.duration / 60))),
        Motorcycle: Math.round(baseFare.Motorcycle + (perKmRate.Motorcycle * (distanceTime.distance / 1000)) + (perMintRate.Motorcycle * (distanceTime.duration / 60))),
        Auto: Math.round(baseFare.Auto + (perKmRate.Auto * (distanceTime.distance / 1000)) + (perMintRate.Auto * (distanceTime.duration / 60)))
    };

    return fare; 
}
module.exports.getFare = getFare;

function getOtp(num){
        const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10,num)).toString();
        return otp;
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All createRide fields are required');
    }

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        fare: fare[ vehicleType ],
        otp: getOtp(6)
    })

    return ride;
}