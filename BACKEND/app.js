const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const path = require("path");
const _dirname = path.resolve();

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

app.use(express.static(path.join(_dirname,"/FRONTEND/dist")));
app.use((_, res) => {
    res.sendFile(path.resolve(_dirname, "FRONTEND", "dist", "index.html"));
});


module.exports = app;
