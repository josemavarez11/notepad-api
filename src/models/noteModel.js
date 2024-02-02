/**
 * @module Note
 * @description Defines the schema for note and exports the Note model.
 */

import mongoose from "mongoose";

/**
 * Represents a note schema.
 * @typedef {Object} NoteSchema
 * @property {mongoose.Schema.Types.ObjectId} user - The user associated with the note.
 * @property {string} title - The title of the note.
 * @property {string} description - The description of the note.
 * @property {mongoose.Schema.Types.ObjectId} priority - The priority of the note.
 * @property {mongoose.Schema.Types.ObjectId} category - The category of the note.
 * @property {Date} createdAt - The date and time when the note was created.
 * @property {Date} updatedAt - The date and time when the note was last updated.
 */
const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: false
    },
    title: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: false,
        unique: false
    },
    priority: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Priority",
        required: false,
        unique: false,
        default: null
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: false,
        unique: false,
        default: null
    },
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);

export default Note;