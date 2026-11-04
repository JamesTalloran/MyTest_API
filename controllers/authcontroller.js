const User = require("../models/User")
const bcrypt = require("bcrypt")
const transporter = require("../config/mail")
const { registerSchema, loginSchema, sendSchema, verifySchema} = require("../validators/authValidator")
const generateToken = require("../utils/generateToken")

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password")
    res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.registerUser = async (req, res) => {
    try {
        const regvalidate = registerSchema.safeParse(req.body)
    
    if(!regvalidate.success) {
        return res.status(400).json({
            message: "Zod validation failed!"
        })
    }
    const {fullname, email, password} = regvalidate.data
    const existUser = await User.findOne({ email })
    if(existUser) {
        return res.status(409).json({
            message: "A user with this email already exist!"
        })
    }
    const hashedpassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        fullname, email, password: hashedpassword
    })
    res.status(201).json({
        message: "User registered!",
        user: {
            fullname: newUser.fullname,
            email: newUser.email
        }
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const logvalidator = loginSchema.safeParse(req.body)
    
    if(!logvalidator.success) {
        return res.status(400).json({
            message: "Zod validation failed!"
        })
    }
    const {email, password} = logvalidator.data
    const user = await User.findOne({ email })
        
        if(!user) {
            return res.status(401).json({
                message: "You are not registered!"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        
        if(!isMatch) {
            return res.status(401).json({
                message: "Wrong password!"
            })
        }
        const token = generateToken(user)
        res.status(200).json({
            message: "User logged successfully!",
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
        
    }
}

exports.sendOTPCode = async (req, res) => {
    try {
        const otpvalidator = sendSchema.safeParse(req.body)

        if(!otpvalidator.success) {
            return res.status(400).json({
                message: "Zod validation failed!"
            })
        }
        const {email} = otpvalidator.data
        const user = await User.findOne({ email })
        
        if(!user) {
            return res.status(404).json({
                message: "Email not found!"
            })
        }
        const Code = Math.floor(100000 + Math.random() * 900000)
          user.otpExpires = new Date(Date.now() + 5 * 60 * 1000)
          user.otp = String(Code)
          await user.save()
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verification Code",
            text: `Your personal verification code ${Code}`
        }) 
        res.status(200).json({
            message: "Verification Code sent!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
        
    }
}

exports.verifyUser = async (req, res) => {
    try {
        const verifyvalidator = verifySchema.safeParse(req.body)

        if(!verifyvalidator.success) {
            return res.status(400).json({
                message: "Zod validation failed!"
            })
        }
        const {email, otp} = verifyvalidator.data
        const user = await User.findOne({ email })

        if(!user) {
            return res.status(404).json({
                message: "User not found!"
            })
        }
        if(user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid otp Code!"
            })
        }
        if(user.otpExpires < new Date(Date.now())) {
            return res.status(400).json({
                message: "OTP expired!"
            })
        }
        else{
            user.isVerified = true
            user.otp = null
            user.otpExpires = null
            await user.save()
        }
         res.status(200).json({
                message: "OTP Code veryfied!"
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if(!user) {
            return res.status(404).json({
                message: "User not found!"
            })
        }
        res.status(200).json({
            user: {
                 fullname: user.fullname,
                 email: user.email,
                 isVerified: user.isVerified
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}