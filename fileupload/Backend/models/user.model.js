import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    }
});

export const User = mongoose.model("User", userSchema);