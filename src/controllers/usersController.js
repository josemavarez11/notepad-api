//External module imports.
import User from "../models/userModel.js";
import Note from "../models/noteModel.js";
import Category from "../models/categoryModel.js";

/**
 * Function to delete a user.
 * @param {*} req 
 * @param {*} res 
 * @returns {void}
 */
export const deleteUser = async (req, res) => {
    const { id } = req.body;

    if(!id) return res.status(400).json({ message: "Id is required to delete a user." });

    try {
        await Note.deleteMany({ userId: id });
        await Category.deleteMany({ userId: id });
        const user = await User.findByIdAndDelete(id);
        res.status(200).json(`User ${user.username} deleted successfully.`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
}

/**
 * Function to update a user's password.
 * @param {*} req 
 * @param {*} res 
 * @returns {void}
 */
export const updatePassword = async (req, res) => {
    const { id, newPassword } = req.body;

    if(!id) return res.status(400).json({ message: "Id is required to update a user's password." });
    if(!newPassword) return res.status(400).json({ message: "New password is required to update a user's password." });

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const passwordMatch = await user.comparePassword(newPassword);
        console.log('passwordMatch: ', passwordMatch);
        if(passwordMatch) return res.status(400).json({ message: "New password cannot be the same as the old password." });

        user.password = newPassword;
        await user.save();
        res.status(200).json(`User ${user.username}'s password updated successfully.`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Function to update a user's username.
 * @param {*} req 
 * @param {*} res 
 * @returns {void}
 */
export const updateUsername = async (req, res) => {
    const { id, newUsername } = req.body;

    if(!id) return res.status(400).json({ message: "Id is required to update a user's username." });
    if(!newUsername) return res.status(400).json({ message: "New username is required to update a user's username." });

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const usernameMatch = await user.compareUsername(newUsername);
        if(usernameMatch) return res.status(400).json({ message: "New username is the same as the old username. No changes made." });

        user.username = newUsername;
        await user.save();
        res.status(200).json(`User ${user.username}'s username updated successfully.`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Function to update a user's email.
 * @param {*} req 
 * @param {*} res 
 * @returns {void}
 */
export const updateEmail = async (req, res) => {
    const { id, newEmail } = req.body;

    if(!id) return res.status(400).json({ message: "Id is required to update a user's email." });
    if(!newEmail) return res.status(400).json({ message: "New email is required to update a user's email." });

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const emailMatch = await user.compareEmail(newEmail);
        if(emailMatch) return res.status(400).json({ message: "New email is the same as the old email. No changes made." });

        user.email = newEmail;
        await user.save();
        res.status(200).json(`User ${user.username}'s email updated successfully.`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}