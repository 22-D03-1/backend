import { Router } from "express";
import * as reports from "../controllers/reports.js";
import validate from "../middlewares/validate.js";
import { postSchema, getSchema, deleteSchema } from "./reports.schema.js";

const router = Router();

// Noch vor den Controllers rufen wir validate auf und übergeben jeweils
// das passende Schema für den Endpoint.
// Ab dieser Stelle wissen wir ja, was genau unser Client mit dem Request machen möchte.
// So lassen sich jetzt hier alle übermittelten Daten im Body überprüfen
// und im Falle eines Fehlers VOR dem Controller abfangen.
// Den Controller müssen wir dafür nicht anpassen.
router.get("/", validate(getSchema), reports.getAll);
router.post("/", validate(postSchema), reports.create);
router.delete("/:id", validate(deleteSchema), reports.remove);

export default router;
