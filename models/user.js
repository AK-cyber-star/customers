import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6, // Min length for password
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);

const User = mongoose.model("User", userSchema);

export default User;