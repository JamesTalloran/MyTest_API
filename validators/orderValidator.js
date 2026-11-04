const {z} = require("zod")
const OrderSchema = z.object({
    customerName: z.string().trim().min(2).max(30),
    address: z.string().trim().min(2).max(20),
    price: z.number().min(1),
    status: z.enum(["pending", "on_the_way", "delivered", "cancelled"]),
    courier: z.string().regex(/^[0-9a-fA-F]{24}$/)
})
module.exports = OrderSchema