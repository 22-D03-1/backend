import dotenv from "dotenv";
dotenv.config();

// In der server.js benötigen wir keinen direkten Zugriff auf eine Datenbankverbindung.
// Uns reicht es, wenn die Verbindung zu MongoDB nur hergestellt wird.
// Daher importieren wir unser passendes Modul und sorgen somit dafür,
// dass das Modul evaluiert/ausgeführt wird.
import "./lib/mongoose.js";

import express from "express";
import reportsRouter from "./routes/reports.js";
const app = express();

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}`));

import logMiddleware from "./middlewares/log.js";
app.use(logMiddleware);

app.use(express.json());
app.use("/reports", reportsRouter);
