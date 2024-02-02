/**
 * @module Category
 * @description Defines the schema for category and exports the Category model.
 */

import mongoose from "mongoose";

/**
 * Represents a category schema.
 * @typedef {Object} CategorySchema
 * @property {mongoose.Schema.Types.ObjectId} user - The user associated with the category.
 * @property {string} name - The name of the category.
 * @property {Date} createdAt - The date and time when the category was created.
 * @property {Date} updatedAt - The date and time when the category was last updated.
 */
const categorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: false
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;