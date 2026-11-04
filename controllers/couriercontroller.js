const Courier = require("../models/Courier")
const CourierSchema = require("../validators/courierValidator")
const mongoose = require("mongoose")

exports.getCouriers = async (req, res) => {
    try {
        const couriers = await Courier.find()
        res.status(200).json({ couriers })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.getCouriersById = async (req, res) => {
    try {
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID!"
            })
        }
        const courier = await Courier.findById(id)

        

        if(!courier) {
           return res.status(404).json({
                message: "Courier not found!"
            })
        }
        res.status(200).json(courier)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.createCourier = async (req, res) => {
    try {
        const courierValidate = CourierSchema.safeParse(req.body)

        if(!courierValidate.success) {
           return res.status(400).json({
                message: "Zod validation failed!"
            })
        }
        const courier = await Courier.create(courierValidate.data)
        res.status(201).json(courier)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.updateCourier = async (req, res) => {
    try {
        const courierValidating = CourierSchema.safeParse(req.body)
        const id = req.params.id
        
        if(!courierValidating.success) {
            return res.status(400).json({
                message: "Zod validation failed!"
            })
        }
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID!"
            })
        }
        const courier = await Courier.findByIdAndUpdate(
            req.params.id,
            courierValidating.data,
            {new: true}
        )

        if(!courier) {
            return res.status(404).json({
                message: "Courier not found!"
            })
        }
        res.status(200).json(courier)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.deleteCourier = async (req, res) => {
    try {
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID!"
            })
        }
        const courier = await Courier.findByIdAndDelete(id)
        
        if(!courier) {
            return res.status(404).json({
                message: "Courier not found"
            })
        }
        res.status(200).json({
            message: "Courier deleted successfully!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}