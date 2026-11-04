const jwt = require("jsonwebtoken")

exports.authMiddleware = (req, res, next) => {
    try {
        const authHead = req.headers.authorization

        if(!authHead) {
            return res.status(401).json({
                message: "Token required!"
            })
        }
        const [type, token] = authHead.split(" ")
        
        if(type !== "Bearer" || !token) {
            return res.status(401).json({
                message: "Invalid authorization format!"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: "Invalid or expired token!"
        })
    }
}