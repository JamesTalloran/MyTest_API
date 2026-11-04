const express = require("express")
const router = express.Router()
const controller = require("../controllers/authcontroller")
const { authMiddleware } = require("../middlewares/authMiddleware")

router.post("/register", controller.registerUser)
router.post("/login", controller.loginUser)
router.post("/send-otp", controller.sendOTPCode)
router.post("/verify-otp", controller.verifyUser)
router.get("/profile", authMiddleware, controller.profile)

module.exports = router