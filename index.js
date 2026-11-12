require("dotenv").config({ path: ".env"})
const cors = require("cors")
const express = require("express")
const authRoutes = require("./routes/authRoutes")
const courierRoutes = require("./routes/courierRoutes")
const orderRoutes = require("./routes/orderRoutes")
const mongoDB = require("./config/db")
const app = express()

mongoDB()
app.use(
    cors({
       origin: ["http://localhost:5173", "https://mytest-api.onrender.com"]
    }))
app.use(express.json())
app.use("/api", authRoutes)
app.use("/api", courierRoutes)
app.use("/api", orderRoutes)

app.get("/", (req, res) => {res.send("Welcome to Backend Delivery Project!")})
app.use((req, res) => {res.status(404).send("Not found page!")})
app.listen(process.env.PORT || 9900, () => {console.log("Server running on port 9900!")})