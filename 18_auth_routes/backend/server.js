import express from "express"
import authRouter from "./routes/authRoutes.js"
import cors from "cors"

import dotenv from "dotenv"
dotenv.config()

import "./lib/connect_db.js"
import "./lib/auth_google.js"

const app = express()
const port = process.env.PORT || 4000

app.use(cors({origin: "*"}))
app.use(express.json())

app.use("/auth", authRouter)

app.use((err, req, res, next) => {
    console.log(err)
    const statusCode = err.statusCode || 500
    res.status(statusCode).send(err.message)
})

app.listen(port, ()=> console.log("App ist am start auf Port: " + port))