const express = require("express")
const router = express.Router()
const controller = require("../controllers/ordercontroller")
const { authMiddleware } = require("../middlewares/authMiddleware")
const { roleMiddleware } = require("../middlewares/roleMiddleware")

router.get("/orders", authMiddleware, controller.getOrders)
router.get("/orders/stats", authMiddleware, roleMiddleware("admin", "manager"), controller.getOrdersStats)
router.get("/orders/:id", authMiddleware, controller.getOrdersById)
router.post("/orders", authMiddleware, roleMiddleware("admin", "manager"), controller.createOrder)
router.put("/orders/:id", authMiddleware, roleMiddleware("admin", "manager"), controller.updateOrder)
router.delete("/orders/:id", authMiddleware, roleMiddleware("admin"), controller.deleteOrder)

module.exports = router