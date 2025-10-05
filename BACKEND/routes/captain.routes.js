const express = require('express');
const router = express.Router();
const captainController = require("../controllers/captain.controller");
const {body} = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/register', [
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullName.lastName').optional().trim().isLength({min:0, max:30}).withMessage('Last name must be between 0 and 30 characters'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn([ 'Car', 'Motorcycle', 'Auto' ]).withMessage('Invalid vehicle type'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')

],
    captainController.registerCaptain
)


router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    captainController.loginCaptain
)


router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;