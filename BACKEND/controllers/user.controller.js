const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const {validationResult} = require("express-validator");
const blackListToken = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullName, email, password} = req.body;
    let user;
    try {
        const hashedPassword = await userModel.hashPassword(password);
        user = await userService.createUser({
            firstName: fullName.firstName,
            lastName:fullName.lastName,
            email,
            password: hashedPassword
        });
    } catch (error) {
        next(error);
    }

    const token  = user.generateAuthToken();
    res.status(201).json({token,user})
    // res.header('Authorization', token).json({message: 'User registered successfully', user, token});
}

module.exports.loginUser = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select('+password');
    //+password is being used bcz in Schema of password we have defined select:false so we have to explicitly find
    if(!user){
        return res.status(401).json({message: 'Inavlid Email or Password'});
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: 'Inavlid Password'});
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);
    res.status(201).json({token,user});
}

module.exports.getUserProfile = async(req,res)=>{
    res.status(200).json(req.user);
        //we wont get password as we have defined select:false in schema of password
}

module.exports.logoutUser = async(req,res)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    await blackListToken.create({ token });
    res.clearCookie('token');
    res.status(200).json({message: 'User logged out successfully'});
}

