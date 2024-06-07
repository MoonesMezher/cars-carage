const User = require('../database/models/User');

const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken');

const userSchema = require('../validation/userValidation');

const env = process.env;

const createToken = (id, email, name) => {
    return jwt.sign({id, email, name},env.JWT_SECRET_KEY);
}

// log in user
const loginAdmin = async (req, res) => {    
    const { name, email, password } = req.body;

    const { error } = userSchema.validate({name, email, password});

    if(error) {
        return res.status(400).json({state: "failed", message: error.details[0].message})
    }

    let admin = await User.findOne({name: process.env.ADMIN_NAME, email: process.env.ADMIN_EMAIL}); 

    if(!admin) {
        const hash = passwordHash.generate(process.env.ADMIN_PASSWORD);

        admin = await User.create({name: process.env.ADMIN_NAME, email: process.env.ADMIN_EMAIL, password: hash}); 
    }

    let user = await User.findOne({name, email}); 
    
    if(!user) {
        return res.status(400).json({state: "failed", message: 'Incorrect name & email'})
    }

    const match = passwordHash.verify(password, user.password);

    if(!match) {
        return res.status(400).json({state: "failed", message: "Incorecct password"})
    }

    try {
        const token = createToken(user._id, user.email, user.name);

        res.status(200).json({state: "success", message: "Logged in successfully", token});
    } catch (error) {
        res.status(400).json({state: "failed", message: error.message})
    }
}

// logout user
const logoutAdmin = async (req, res) => {
    try {
        // Clear the JWT token from the client
        res.clearCookie('jwt');
    
        // Return a success response
        return res.status(200).json({ state: "success", message: 'Logged out successfully' });
    } catch (err) {
        return res.status(500).json({ state: "failed", message: 'Internal Server Error' });
    }
};

module.exports = {
    loginAdmin,
    logoutAdmin,
}