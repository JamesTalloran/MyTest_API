const express = require("express")
const router = express.Router()
const controller = require("../controllers/couriercontroller")
const { authMiddleware } = require("../middlewares/authMiddleware")
const { roleMiddleware } = require("../middlewares/roleMiddleware")

router.get("/couriers", authMiddleware, controller.getCouriers)
router.get("/couriers/:id", authMiddleware, controller.getCouriersById)
router.post("/couriers", authMiddleware, roleMiddleware("admin"), controller.createCourier)
router.put("/couriers/:id", authMiddleware, roleMiddleware("admin"), controller.updateCourier)
router.delete("/couriers/:id", authMiddleware, roleMiddleware("admin"), controller.deleteCourier)

module.exports = router