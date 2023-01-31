import dotenv from "dotenv";
dotenv.config();

import express from "express";
import checkToken from "./middlewares/checkToken.js";
import authRouter from "./routes/auth.js";
import protectedRouter from "./routes/protectedRoutes.js";
const app = express();

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}`));

import checkMethodMiddleware from "./middlewares/checkMethod.js";
app.use(checkMethodMiddleware);

app.use(express.json());

app.use("/auth", authRouter);
app.use("/protected-routes", checkToken, protectedRouter);

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).end();
});
