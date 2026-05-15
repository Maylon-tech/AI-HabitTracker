import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const signToken = (id) => {
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "30d"
    })
}

export const register = async (req, res) => {
    
    try {
        const { name, email, password } = req.body



    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}