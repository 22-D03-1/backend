import { Router } from "express";
import checkRole from "../middlewares/checkRole.js";

const router = Router();

router.post("/", checkRole(["Editor", "Admin"]), (req, res, next) => {
    res.status(201).end();
});
router.get("/", (req, res, next) => {
    res.json([]);
});
router.put("/:id", checkRole(["Editor", "Admin"]), (req, res, next) => {
    res.status(204).end();
});
router.delete("/:id", checkRole(["Admin", "Mastermind"]), (req, res, next) => {
    res.status(204).end();
});

export default router;
