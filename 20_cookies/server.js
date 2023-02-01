import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import {dirname} from "path"
import { fileURLToPath } from 'url';

import authRouter from "./routes/authRoutes.js"
import {authorize} from "./middleware/auth.js"

import dotenv from "dotenv"
dotenv.config()

import "./lib/connect_db.js"
import "./lib/auth_google.js"

const app = express()
const port = process.env.PORT || 4000

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
})) */

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"))
app.get("/login", (req, res) => res.sendFile(__dirname + "/views/login.html"))
app.get("/register", (req, res) => res.sendFile(__dirname + "/views/register.html"))

app.use("/auth", authRouter)
app.get("/hidden", authorize, (req, res) => {
    res.json("geheim")
})

app.use((err, req, res, next) => {
    console.log(err)
    const statusCode = err.statusCode || 500
    res.status(statusCode).send(err.message)
})

app.listen(port, ()=> console.log("App ist am start auf Port: " + port))