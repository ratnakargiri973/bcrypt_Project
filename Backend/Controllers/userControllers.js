import bcrypt from 'bcrypt';
import User from '../Models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10; // Default value for salt rounds

// Controller for registering a new user
export const registerUser = async (req, res) => {
    const { userName, Email, Password } = req.body;

    try {
        // Check if user or email already exists
        const existingUser = await User.findOne({ $or: [{ userName }, { Email }] });
        if (existingUser) return res.status(400).json({ error: 'User or email already exists' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(Password, SALT_ROUNDS);
        console.log(hashedPassword);

        // Create new user
        const newUser = new User({
            userName,
            Email,
            Password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller for logging in user
export const loginUser = async (req, res) => {
    const { usernameOrEmail, Password } = req.body;

    try {
        // Check for user by either username or email
        const user = await User.findOne({ $or: [{ userName: usernameOrEmail }, { Email: usernameOrEmail }] });
        if (!user) return res.status(400).json({ error: 'User not found' });

        // Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
