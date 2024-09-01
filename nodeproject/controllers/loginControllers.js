const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Signup = require('../models/Signup');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await Signup.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({message:'Login Successful', token });

    } catch (error) {
        console.error('Error Occurred:',error);
        res.status(500).json({ message: 'Server error', error: err.message  });
    }
};

module.exports = login;