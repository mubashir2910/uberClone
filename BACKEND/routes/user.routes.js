const express = require('express');
const router = express.Router();    
const userController = require("../controllers/user.controller");
const {body} = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");


router.post("/register",[
    body('fullName.firstName').trim().isLength({min:3, max:30}).withMessage('First name must be between 3 and 30 characters'),
    body('fullName.lastName').optional().trim().isLength({min:0, max:30}).withMessage('Last name must be between 0 and 30 characters'),
    body('email').isEmail().withMessage('Please enter a valid email')
], 
userController.registerUser
);

router.post("/login",[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').not().isEmpty().withMessage('Valid Password is required')
],
userController.loginUser
);

router.get("/profile",authMiddleware.authUser,userController.getUserProfile);

router.get("/logout",authMiddleware.authUser, userController.logoutUser);



module.exports = router;
