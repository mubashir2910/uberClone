const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const connectDB = require("./config/db");
connectDB();

const userRoutes = require("./routes/user.routes");
app.use("/users", userRoutes);

const captainRoutes = require("./routes/captain.routes");
app.use("/captains", captainRoutes);

const mapsRoutes = require("./routes/maps.routes");
app.use("/maps", mapsRoutes);

const rideRoutes = require('./routes/ride.routes');
app.use('/rides',rideRoutes);


module.exports = app;
