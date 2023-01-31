import { Router } from "express";
import token from "../lib/token.js";

const router = Router();

const users = [
    {
        id: 1,
        username: "user1",
    },
    {
        id: 2,
        username: "user2",
    },
    {
        id: 3,
        username: "user3",
    },
    {
        id: 4,
        username: "user4",
    },
];

router.post("/login", (req, res, next) => {
    const user = users.find(user => user.username === req.body.username);
    if (!user) return res.status(401).end();

    const userToken = token.signToken({ id: user.id });
    res.json(userToken);
});

export default router;
