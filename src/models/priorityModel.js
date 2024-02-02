/**
 * @module Priority
 * @description Defines the schema for priority and exports the Priority model.
 */

import mongoose from "mongoose";

/**
 * Represents a priority schema.
 * @typedef {Object} PrioritySchema
 * @property {number} value - The value of the priority.
 * @property {string} description - The description of the priority.
 * @property {Date} createdAt - The date and time when the priority was created.
 * @property {Date} updatedAt - The date and time when the priority was last updated.
 */
const prioritySchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const Priority = mongoose.model("Priority", prioritySchema);

export default Priority;