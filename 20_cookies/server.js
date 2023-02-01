import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

//Die beiden imports benötigen wir, damit wir die html Dateien finden
import {dirname} from "path"
import { fileURLToPath } from 'url';

import authRouter from "./routes/authRoutes.js"
import {authorize, loggedIn} from "./middleware/auth.js"

import dotenv from "dotenv"
dotenv.config()

import "./lib/connect_db.js"
import "./lib/auth_google.js"

const app = express()
const port = process.env.PORT || 4000

// speichert unser aktuelles Verzeichnis in der Variable __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Das ewige Laster mit CORS... -.- Wenn Das Backend das Frontend ausliefert, benötigen wir cors nicht mehr
// Falls doch müssen wir mit credentials: true zulassen, das der cookie mitgeschickt wird
// In dem Fall können wir keine Wildcard (*) bei origina angeben, sondern genau sagen wo unsere Zugriffe herkommen
/* app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
})) */

app.use(express.json())

// Der cookie parser ist ein Paket was wir als middleware einbinden, 
//ndamit wir die Cookies aus dem req Objekt auslesen können
app.use(cookieParser())

/**
 * Routen, die unsere HTML Frontend Dateien ausgeben
 * Außerdem binden wir Middleware ein, die überprüft ob unser Nutzer eingeloggt ist
 */
app.get("/", authorize, (req, res) => res.sendFile(__dirname + "/views/index.html"))
app.get("/login", loggedIn, (req, res) => res.sendFile(__dirname + "/views/login.html"))
app.get("/register", loggedIn, (req, res) => res.sendFile(__dirname + "/views/register.html"))

app.use("/auth", authRouter)

app.use((err, req, res, next) => {
    console.log(err)
    const statusCode = err.statusCode || 500
    res.status(statusCode).send(err.message)
})

app.listen(port, ()=> console.log("App ist am start auf Port: " + port))