const {z} = require("zod")
const registerSchema = z.object({
    fullname: z.string().trim().min(2).max(30),
    email: z.string().email().trim(),
    password: z.string().trim().min(6).max(30).regex(/\d/)
})

const loginSchema = z.object({
    email: z.string().email().trim().min(6).max(30),
    password: z.string().trim().min(2).max(30).regex(/\d/)
})

const sendSchema = z.object({
    email: z.string()
    .trim()
    .min(1, "Email cannot be empty!")
    .email("Invalid email format!")
})

const verifySchema = z.object({
    email: z.string()
    .trim()
    .min(1, "Email cannot be empty!")
    .email("Invalid email format!"),

    otp: z.string()
    .trim()
    .length(6, "OTP must be 6 characters long!")
    .regex(/^[0-9]+$/, "OTP must contain only numbers!")
})
module.exports = {registerSchema, loginSchema, sendSchema, verifySchema}