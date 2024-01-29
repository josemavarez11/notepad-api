import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
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