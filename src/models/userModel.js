import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
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

userSchema.methods.comparePassword = async function (password) {
    let match = await bcrypt.compare(password, this.password);
    return match;
}

userSchema.methods.compareUsername = function (username) {
    if (username === this.username) return true;
    else return false;
}

userSchema.methods.compareEmail = async function (email) {
    if (email === this.email) return true;
    else return false;

}

const User = mongoose.model("User", userSchema);

export default User;