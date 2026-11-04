const Order = require("../models/Order")
const OrderSchema = require("../validators/orderValidator")
const Courier = require("../models/Courier")
const mongoose = require("mongoose")

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("courier", "fullname phone")
        res.status(200).json({ orders })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.getOrdersById = async (req, res) => {
    try {
        const id = req.params.id
        
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID!"
            })
        }
        const order = await Order.findById(id).populate("courier", "fullname phone")

        if(!order) {
            return res.status(404).json({
                message: "Order not found!"
            })
        }
        res.status(200).json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.getOrdersStats = async (req, res) => {
    try {
        const stats = await Order.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1}
                }
            }
        ])
        res.status(200).json(stats)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.createOrder = async (req, res) => {
    try {
        const orderValidate = OrderSchema.safeParse(req.body)

        if(!orderValidate.success) {
            return res.status(400).json({
                message: "Zod validation failed!"
            })
        }
        const courier = await Courier.findById(orderValidate.data.courier)

        if(!courier) {
            return res.status(404).json({
                message: "Courier not found!"
            })
        }
        const order = await Order.create(orderValidate.data)
        res.status(201).json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const id = req.params.id
        const orderValidating = OrderSchema.safeParse(req.body)

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID!"
            })
        }

        if(!orderValidating.success) {
            return res.status(400).json({
                message: "Zod validation failed!"
            })
        }
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            orderValidating.data,
            {new: true}
        )
        
        if(!order) {
            return res.status(404).json({
                message: "Order not found!"
            })
        }
        res.status(200).json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const id = req.params.id

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID!"
            })
        }
        const order = await Order.findByIdAndDelete(id)
        
        if(!order) {
            return res.status(404).json({
                message: "Order not found!"
            })
        }
        res.status(200).json({
            message: "Order deleted successfully!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}