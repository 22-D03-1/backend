import { Router } from "express"
import * as controller from "../controllers/photoController.js"

const router = Router()

router
    .get("/", controller.getAllPhotos)
    .get("/:photoId", controller.getPhoto)
    .post("/", controller.createPhoto)
    .put("/:photoId", controller.editPhoto)
    .delete("/:deleteId", controller.deletePhoto)

export default router

