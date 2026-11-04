const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        enum: ["pending", "on_the_way", "delivered", "cancelled" ],
        type: String,
        default: "pending"
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    courier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courier"
    }
})
module.exports = mongoose.model(
    "Order",
    OrderSchema
)