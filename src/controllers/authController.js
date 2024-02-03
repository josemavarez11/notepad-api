//External modules imports.
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//Internal modules imports.
import User from '../models/userModel.js';

/**
 * @class
 * @classdesc The controller for handling user authentication.
 * @method register
 * @method login
 * @method logout
 */
class AuthController {
    static async register(req, res, next) {
        const { username, email, password } = req.body;
        let userExists = await User.find({ email: email });
        if (userExists > 0) return res.status(400).json({ message: 'User already exists.' });
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword });
            await user.save();
            console.log(`New user created: ${user}.`);
            res.status(201).json({ message: `User created successfully and logged in with this token: ${token}` });
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
            console.log(`User ${username} has logged in.`);
            return res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }

    static async logout(req, res, next) {
        return res.status(200).json({ message: 'Logout successful.' });
    }  
}

export default AuthController;
