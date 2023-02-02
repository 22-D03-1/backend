import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import authRouter from "./routes/authRoutes.js"

import dotenv from "dotenv"
dotenv.config()

import "./lib/connect_db.js"
import "./lib/auth_google.js"

const app = express()
const port = process.env.PORT || 4000

// Das ewige Laster mit CORS... -.- Wenn Das Backend das Frontend ausliefert, benötigen wir cors nicht mehr
// Falls doch müssen wir mit credentials: true zulassen, das der cookie mitgeschickt wird
// In dem Fall können wir keine Wildcard (*) bei origina angeben, sondern genau sagen wo unsere Zugriffe herkommen
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
})) 

app.use(express.json())

// Der cookie parser ist ein Paket was wir als middleware einbinden, 
//ndamit wir die Cookies aus dem req Objekt auslesen können
app.use(cookieParser())

app.use("/auth", authRouter)

app.use((err, req, res, next) => {
    console.log(err)
    const statusCode = err.statusCode || 500
    res.status(statusCode).send(err.message)
})

app.listen(port, ()=> console.log("App ist am start auf Port: " + port))