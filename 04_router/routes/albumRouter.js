import express from "express"
import * as controller from "../controller/albumController.js"

/**
 * Zum initialisieren des Routers nutzen wir express.Router()
 * Jetzt können wir den Objekt unsere Routen geben
 */

const router = express.Router()

/**
 * Bei RESTful routing benötigen wir immer 5 routen
 * GET für alle, GET für 1, DELETE zum löschen, PUT zum ändern
 * und POST zum erstellen. 
 * Die Funktion, die die Anfrage bearbeitet und eine Antwort zurück
 * gibt haben wir in den Controller ausgelagert.
 * 
 * BEACHTE: Da wir in der main.js schon angegeben haben, dass der 
 * Router für den path "/albums" angelegt wird, müssen wir das bei
 * dem Pfad für die Routen nicht nochmal angeben.
 * 
 * BEACHTE 2: 
 * router
 *     .get(...)
 *     .post(...) etc. 
 * klappt genau wie:
 * router.get(...)
 * router.post(...) etc.
 * ist aber übersichtlicher.
 */

router
    .get("/", controller.getAllAlbums)
    .get("/:id", controller.getAlbum)
    .put("/:id", controller.editAlbum)
    .delete("/:id", controller.deleteAlbum)
    .post("/", controller.saveAlbum)

export default router