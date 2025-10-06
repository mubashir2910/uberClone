const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const {validationResult} = require("express-validator");
const blackListToken = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {fullName, email, password,vehicle} = req.body;
    // console.log(req.body);
    let captain;    
    try {
        const hashedPassword = await captainModel.hashPassword(password);
        captain = await captainService.createCaptain({
            firstName: fullName.firstName,
            lastName:fullName.lastName,
            email,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
            password: hashedPassword
        });
    } catch (error) {
        next(error);
    }       
    const token  = captain.generateAuthToken();
    res.status(201).json({token,captain});
}

module.exports.loginCaptain = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email,password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password');
    //+password is being used bcz in Schema of password we have defined select:false so we have to explicitly find
    if(!captain){
        return res.status(401).json({message: 'Inavlid Email or Password'});
    }

    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: 'Inavlid Password'});
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);
    res.status(201).json({token,captain});
}

module.exports.getCaptainProfile = async(req,res)=>{
    res.status(200).json(req.captain);
        //we wont get password as we have defined select:false in schema of password
}

module.exports.logoutCaptain = async(req,res)=>{
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    await blackListToken.create({ token });
    res.status(200).json({message: 'Captain logged out successfully'});
}


