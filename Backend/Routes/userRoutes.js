import express from 'express';
import { registerUser, loginUser } from '../Controllers/userControllers.js';

const router = express.Router();

// POST route for registering user
router.post('/register', registerUser);

// POST route for user login
router.post('/login', loginUser);

export default router;
