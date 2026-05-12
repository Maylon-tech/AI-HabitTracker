import express from 'express'
import "dotenv/config"
import cors from 'cors'
import { connectDB } from './config/db.js'
import { notFound, errorHandler } from "./middleware/errorHandler.js"

const app = express()

const allowedOrigins = (process.env.CLIENT_URL || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

const corsOptions = {
    origin(origin, cb) {
        // allow request with no origin (curl, same-origin, server-to-server)
        if (!origin) return cb(null, true)
        // allow any localhost /127.0.0.1 origin in development
        if (/https?:\/\/(localhost|127\.0\.0\.1\)(:\d+)?$/.test(origin)) {
            return cb(null, true)
        }
    }
}