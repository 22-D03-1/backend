import { Router } from "express"
import * as controller from "../controllers/photoController.js"

const router = Router()

router
    .get("/", controller.getAllPhotos)
    .get("/:photoId", controller.getPhoto)
    .post("/", controller.createPhoto)
    .put("/:photoId", controller.editPhoto)
    .delete("/:photoId", controller.deletePhoto)
    .post("/newFake", controller.createFake)

export default router

