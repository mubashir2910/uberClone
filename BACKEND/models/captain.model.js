const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
        fullName:{
            firstName:{
                type: String,
                required: true,
                trim: true, //trim spaces from start and ending
                minLength: [3, 'First name must be at least 3 characters'],
                maxLength: [30, 'First name must be of max 30 characters']
            },
            lastName:{
                type: String,
                trim: true, //trim spaces from start and ending
                minLength: [0, 'Last name must be at least 3 characters'],
                maxLength: [30, 'Last name must be of max 30 characters']
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minLength: [6, 'Email must be of at least 6 characters'],
            match: [ /^\S+@\S+\.\S+$/, 'Please enter a valid email' ],
            lowercase: true,
            trim: true
        },
        password:{
            type: String,
            required: true,
            select: false
        },
        socketId:{ //Will be used for getting captains location
            type: String
        },

        status: {
        type: String,
        enum: [ 'active', 'inactive' ],
        default: 'inactive',
        required: true
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [ 3, 'Color must be at least 3 characters long' ],
        },
        plate: {
            type: String,
            required: true,
            minlength: [ 3, 'Plate must be at least 3 characters long' ],
        },
        capacity: {
            type: Number,
            required: true,
            min: [ 1, 'Capacity must be at least 1' ],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: [ 'Car', 'Motorcycle', 'Auto' ],
        }
    },

    location: {
        ltd: { //latitude
            type: Number,
        },
        lng: { //longitude
            type: Number,
        }
    }
})

// methods is an object where you can attach instance methods — functions that every document (instance) created from that schema can use.
captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
    return token;
}

captainSchema.methods.comparePassword =async function (password) {
    return await bcrypt.compare(password,this.password);
}

// statics is an object where you can attach static methods — functions that are called on the model itself.
captainSchema.statics.hashPassword =async function (password) {
    return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel

