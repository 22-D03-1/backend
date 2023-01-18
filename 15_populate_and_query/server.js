import express from "express"
import photoRouter from "./routes/photoRoutes.js"

import dotenv from "dotenv"
dotenv.config()

import "./lib/connect_db.js"

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())

app.use("/photos", photoRouter)

/**
 * Wir implementieren einen Error Handler am Ende unserer Routen und Middleware, der alle Fehler
 * abfangen soll. Daher geben wir ihm einen flexiblen Statuscode. Wir setzen ihn nur 500,
 * falls kein anderer Statuscode von uns gesetzt wurde.
 */

app.use((err, req, res, next) => {
    console.log(err)
    const statusCode = err.statusCode || 500
    res.status(statusCode).send(err.message)
})

app.listen(port, ()=> console.log("App ist am start auf Port: " + port))