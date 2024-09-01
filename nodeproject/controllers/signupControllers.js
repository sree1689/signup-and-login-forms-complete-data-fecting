const bcrypt = require('bcryptjs');
const Signup = require('../models/Signup');

const signup = async (req, res) => {
    try {
        const { firstname, lastname, username,email, password } = req.body;
        const existingUser = await Signup.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists!' });
        }

        // Hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with the hashed password
        const newSignup = new Signup({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword
        });

        await newSignup.save();
        res.status(201).json({ message: 'User signup successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error while signing up', error });
    }
};

const getAllusers = async (req, res) => {
    try {
        const users = await Signup.find();
        const usersWithSNo = users.map((user, index) => ({
            SNo: index + 1,
            ...user.toObject()
        }));
        res.status(200).json(usersWithSNo);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

const getuserbyid = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Signup.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    try {
        // Hash the new password if provided
        const updateData = { email };
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await Signup.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User data updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const deleteuser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await Signup.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports = { signup, getAllusers, getuserbyid, updateUser, deleteuser };