import express from "express"
import * as controller from "../controller/albumController.js"

const router = express.Router()

router
    .get("/", controller.getAllAlbums)
    .get("/:id", controller.getAlbum)
    .put("/:id", controller.editAlbum)
    .delete("/:id", controller.deleteAlbum)
    .post("/", controller.saveAlbum)

export default router