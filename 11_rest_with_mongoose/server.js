import express from "express"
import photoRouter from "./routes/photoRoutes.js"

import dotenv from "dotenv"
dotenv.config()

import "./lib/connect_db.js"

const app = express()

const port = process.env.PORT || 4000

app.use(express.json())

app.use("/photos", photoRouter)

app.listen(port, ()=> console.log("App ist am start auf Port: " + port))