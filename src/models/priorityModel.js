import mongoose from "mongoose";

const prioritySchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
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
});

const Priority = mongoose.model("Priority", prioritySchema);

export default Priority;