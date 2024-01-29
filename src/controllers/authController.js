import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import getEnvPath from '../utils/getEnvPath.js';
import LOG_STYLES from '../utils/chalkStyles.js';
import User from '../models/userModel.js';

const envPath = getEnvPath();
dotenv.config({ path: envPath });

class AuthController {
    static async register(req, res, next) {
        const { username, email, password } = req.body;
        let userExists = await User.find({ email: email });
        if (userExists) return res.status(400).json({ message: 'User already exists.' });
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword });
            await user.save();
            console.log(LOG_STYLES.NEW_USER(`New user created: ${user}.`));
            res.status(201).json({ message: "User created successfully." });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });
            if (!user) return res.status(404).json({ message: 'User not found.' });

            const passwordMatch = await user.comparePassword(password);
            if (!passwordMatch) return res.status(401).json({ message: 'Incorrect password.' });

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            console.log(LOG_STYLES.LOGIN_USER(`User ${username} has logged in.`));
            return res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }

    static async logout(req, res, next) {
        return res.status(200).json({ message: 'Logout successful.' });
        // try {
        //     await AsyncStorage.removeItem('token');
        //     console.log(LOG_STYLES.LOGOUT_USER('User has logged out.'));
        //     return res.status(200).json({ message: 'Logout successful.' });
        // } catch (error) {
        //     next(error);
        // }
    }  
}

export default AuthController;
