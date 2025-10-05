const express = require("express");
const router = express.Router();
const {body,query} = require("express-validator");
const authMiddleware = require('../middlewares/auth.middleware');
const rideController = require('../controllers/ride.controller');

router.post('/create',authMiddleware.authUser,[
    body('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address')
    ], 
    rideController.createRide
)

router.get('/get-fare',
    authMiddleware.authUser,
    query('origin').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    rideController.getFare
)

// router.post('/confirm',
//     authMiddleware.authCaptain,
//     body('rideId').isMongoId().withMessage('Invalid ride id'),
//     rideController.confirmRide
// )

// router.get('/start-ride',
//     authMiddleware.authCaptain,
//     query('rideId').isMongoId().withMessage('Invalid ride id'),
//     query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
//     rideController.startRide
// )

// router.post('/end-ride',
//     authMiddleware.authCaptain,
//     body('rideId').isMongoId().withMessage('Invalid ride id'),
//     rideController.endRide
// )

module.exports = router;