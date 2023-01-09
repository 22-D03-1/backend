import { Router } from "express";
import * as reports from "../controllers/reports.js";

const router = Router();

router.get("/", reports.getAll);
router.get("/:id", reports.getOne);
router.put("/:id", reports.replace);
router.patch("/:id", reports.update);
router.delete("/:id", reports.remove);
router.post("/", reports.create);

export default router
