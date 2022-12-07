import express from "express"

import albumRouter from "./routes/albumRouter.js"
import photoRouter from "./routes/photoRouter.js"

//import data from "./db/data.json" assert { type: "json" };

const server = express()
const port = 3000

/**
 * 1. Frontend macht einen fetch("backend.de:3000") und sendet Request/Anfrage an Backend
 * --> 2. Route bekommt Anfrage als req Objekt und verarbeitet Anfrage
 * --> 3. Route sendet eine Response/Antwort als res Objekt weiter bspw an Middleware
 * --> 4. Frontend erhält Antwort
 */

server.use(express.json()) //JSON parser

/**
 * Anstatt alle Routen in unsere main.js untereinander aufzulisten. Verpacken wir sie in
 * einzelne Router. Ein Router ist fast wie ein express Mini-Server.
 * Wir kombinieren nun verschiedne Router zu unserem Server.
 * Dafür sagen wir express: Nutze (use) den Router für alle Anfragen zu dem angegeben Pfad
 */

server.use("/albums", albumRouter)
server.use("/photos", photoRouter)

server.listen(port, ()=> {
    console.log("Server is running on " + port)
})
