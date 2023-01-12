import express from "express"
import photoRouter from "./routes/photoRoutes.js"

import dotenv from "dotenv"
dotenv.config()

import "./lib/connect_db.js"

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())

/*

Throw new Error klappt in der Middleware und wird von dem Erroro Handler
abgefangen. Jedoch nicht in unserer Asynchronen Controller Funktion.

app.use((req, res, next) => {
    throw new Error("mist")
})
*/

app.use("/photos", photoRouter)

app.use((err, req, res, next) => {
    console.log(err)
    const statusCode = err.statusCode || 500
    res.status(statusCode).send(err.message)
})

app.listen(port, ()=> console.log("App ist am start auf Port: " + port))