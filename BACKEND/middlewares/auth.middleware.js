const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");
const jwt = require("jsonwebtoken");
const blackListToken = require("../models/blacklistToken.model");

//Checks whether the user is logged in or not , if not logged in then it will not allow to access protected routes
module.exports.authUser = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blackListToken.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id); //jwt sign mein sirf id diya tha isliye check sirf id se karna hai
        req.user = user;

        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}


module.exports.authCaptain = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blackListToken.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id); //jwt sign mein sirf id diya tha isliye check sirf id se karna hai
        req.captain = captain;

        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}