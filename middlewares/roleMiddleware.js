exports.roleMiddleware = (...roles) => {
    return (req, res, next) => {
        if(!req.user || !req.user.role) {
            return res.status(403).json({
                message: "Invalid format!"
            })
        }
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Your access is denied!"
            })
        }
        next()
    }
}