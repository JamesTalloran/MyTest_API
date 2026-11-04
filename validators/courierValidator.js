const {z} = require("zod")
const courierSchema = z.object({
    fullname: z.string().trim().min(2).max(30),
    email: z.string().email().trim(),
    phone: z.string().trim().min(8).max(16).regex(/^\+\d+$/),
    vehicle: z.string().trim()
})
module.exports = courierSchema