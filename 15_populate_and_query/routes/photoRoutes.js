import { Router } from "express"
import * as controller from "../controllers/photoController.js"

const router = Router()

router
    .get("/", controller.getAllPhotos)
    .get("/:photoId", controller.getPhoto)
    .post("/", controller.createPhoto)
    .patch("/:photoId", controller.updatePhoto)
    .put("/:photoId", controller.replacePhoto)
    .delete("/:photoId", controller.deletePhoto)
    .post("/newFake", controller.createFake)

export default router

