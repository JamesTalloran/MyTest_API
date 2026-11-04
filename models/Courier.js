const mongoose = require("mongoose")

const CourierSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    vehicle: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model(
    "Courier",
    CourierSchema
)