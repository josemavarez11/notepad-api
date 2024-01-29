import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
    },
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