import express from "express"

import hotelRouter from "./routes/hotelRoutes.js"

const server = express()
const port = 4000

/**
 * Das ist natürlich eine sehr schlechte und unsichere Security Maßnahme.
 * Wie wir unser Backend sicherer machen, lernen wir in ein paar Wochen.
 * Das ist aber zur Veranschaulichung eine Middleware, die überprüft, ob ein API Key
 * über die Query Parameter übergeben wurde und ob dieser stimmt.
 */
const apiKey = "040"

server.use((req, res, next) => {
    if(req.query.api_key === apiKey) {
        next()
    } else {
        res.status(401).send("Du kommst hier nicht rein.")
    }
})

server.use("/hotels", hotelRouter)

server.use((req, res) => {
    res.status(404).send("Seite nicht verfügbar")
})

server.listen(port, () => {
    console.log("Server is running on " + port)
})

export default server