import express from "express"
import cors from "cors"

import albumRouter from "./routes/albumRouter.js"
import photoRouter from "./routes/photoRouter.js"

//import data from "./db/data.json" assert { type: "json" };

const server = express()
const port = 4000

/**
 * 1. Frontend macht einen fetch("backend.de:3000") und sendet Request/Anfrage an Backend
 * --> 2. Route bekommt Anfrage als req Objekt und verarbeitet Anfrage
 * --> 3. Route sendet eine Response/Antwort als res Objekt weiter bspw an Middleware
 * --> 4. Frontend erhält Antwort
 */

server.use(express.json()) //JSON parser


/**
 * Wir nutzen das cors npm Paket um den Zugriff auf unseren Server zu erlauben.
 * CORS steht für cross-origin resource sharing und erlaubt den Zugriff innerhalb der selben Domain.
 * Das Objekt als Parameter kann auch weg gelassen werden, veranschaulicht aber nochmal, dass wir
 * von überall Zugriffe erlauben (durch das *) und dass wir hier auch explizit den Zugriff auf 
 * bestimmte domains limiteren können
 * 
 */
server.use(cors({origin: "*"}))

/**
 * Anstatt alle Routen in unsere main.js untereinander aufzulisten. Verpacken wir sie in
 * einzelne Router. Ein Router ist fast wie ein express Mini-Server.
 * Wir kombinieren nun verschiedne Router zu unserem Server.
 * Dafür sagen wir express: Nutze (use) den Router für alle Anfragen zu dem angegeben Pfad
 */

server.use("/albums", albumRouter)
server.use("/photos", photoRouter)

server.use((req,res)=>{
    res.status(404).send("Diese Seite gibt es nicht :(")
})

server.use((err, req, res, next) => {
    console.log("Ein Fehler ist aufgetreten", err)
    res.status(500).send("Es liegt nicht an dir sondern an mir...")
})

server.listen(port, ()=> {
    console.log("Server is running on " + port)
})
