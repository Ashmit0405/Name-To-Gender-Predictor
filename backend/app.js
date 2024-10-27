import express, { urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config()
import cors from "cors"
const app=express()
app.use(cors({
    origin: process.env.CORS_ORIGIN.toString(),
    credentials: true
}))
app.use(express.json({limit: "15kb"}))
app.use(urlencoded({extended: true,limit: "15kb"}))
app.use(express.static("public"))

import predictrouter from "./routes/prediction.route.js";
app.use('/api/v1/model',predictrouter)
export {app};