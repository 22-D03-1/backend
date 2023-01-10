import { Router } from "express";
import * as reports from "../controllers/reports.js";

const router = Router();

router.get("/", reports.getAll);
router.post("/", reports.create);

export default router
