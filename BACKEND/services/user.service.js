const userModel = require("../models/user.model");

module.exports.createUser = async ({firstName, lastName, email, password}) => {
    if(!firstName || !email || !password){
        throw new Error('All feilds are required');
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({email});
    if (existingUser) {
        throw new Error('User already exists with this email');
    }  

    const user = userModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    })
    
    return user;
}
