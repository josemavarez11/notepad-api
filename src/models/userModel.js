/**
 * @module User
 * @description Defines the schema for user and exports the User model.
 */

import mongoose from "mongoose";
import bcrypt from "bcrypt";

/**
 * Represents a user schema.
 * @typedef {Object} UserSchema
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {Date} createdAt - The date and time when the user was created.
 * @property {Date} updatedAt - The date and time when the user was last updated.
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

/**
 * Middleware function that hashes the user's password before saving it to the database.
 * @param {function} next - The next function to be called.
 */
userSchema.pre("save", async function(next) {
    const user = this;
    if(!user.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

/**
 * Compares the provided password with the user's hashed password.
 * @param {string} password - The password to compare.
 * @returns {boolean} - True if the passwords match, false otherwise.
 */
userSchema.methods.comparePassword = async function (password) {
    let match = await bcrypt.compare(password, this.password);
    return match;
}

/**
 * Compares the provided username with the user's username.
 * @param {string} username - The username to compare.
 * @returns {boolean} - True if the usernames match, false otherwise.
 */
userSchema.methods.compareUsername = function (username) {
    if (username === this.username) return true;
    else return false;
}

/**
 * Compares the provided email with the user's email.
 * @param {string} email - The email to compare.
 * @returns {boolean} - True if the emails match, false otherwise.
 */
userSchema.methods.compareEmail = async function (email) {
    if (email === this.email) return true;
    else return false;
}

const User = mongoose.model("User", userSchema);

export default User;