import express, { application } from "express"

import albumRouter from "./router/albumRouter.js"
import photoRouter from "./router/photoRouter.js"

//import data from "./db/data.json" assert { type: "json" };

const server = express()
const port = 3000

/**
 * Frontend macht einen fetch("backend.de:3000")
 * --> Sendet Request/Anfrage an Backend
 * --> Route bekommt Anfrage als req Objekt und verarbeitet Anfrage
 * --> Route sendet eine Response/Antwort als res Objekt weiter bspw an Middleware
 * --> Frontend erhält Antwort bspw mit Daten
 */

server.use(express.json()) //JSON parser

server.use("/albums", albumRouter)
server.use("/photos", photoRouter)

server.listen(port, ()=> {
    console.log("Server is running on " + port)
})
