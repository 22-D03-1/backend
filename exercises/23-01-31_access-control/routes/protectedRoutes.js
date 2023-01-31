import { Router } from "express";

const router = Router();

router.post("/", (req, res, next) => {
    res.status(201).end();
});
router.get("/", (req, res, next) => {
    res.json([]);
});
router.put("/:id", (req, res, next) => {
    res.status(204).end();
});
router.delete("/:id", (req, res, next) => {
    res.status(204).end();
});

export default router;
