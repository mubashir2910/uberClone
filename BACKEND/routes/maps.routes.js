const express = require('express');
const router = express.Router();
const mapController = require("../controllers/maps.controller");
const {query} = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

router.get('/getCoordinates'
    ,query('address').isString().isLength({min:3}),
    authMiddleware.authUser,
    mapController.getCoordinates
);

router.get('/getDistanceTime',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    authMiddleware.authUser,
    mapController.getDistanceTime
);

router.get('/getSuggestions',
    query('input').isString().isLength({min:2}),
    authMiddleware.authUser,
    mapController.getSuggestions
);

module.exports = router;