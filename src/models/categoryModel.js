import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
        unique: false
    },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;