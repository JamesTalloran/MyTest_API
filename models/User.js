const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
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
    role: {
        type: String,
        default: "user"
    },
    otp: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otpExpires: {
        type: Date
    }
})
module.exports = mongoose.model(
    "User",
    UserSchema
)