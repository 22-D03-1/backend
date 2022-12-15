import express from "express"
import cors from "cors"
// Um unsere Umgebungsvariablen aus der Datei .env zu laden, nutzen wir das Modul dotenv.
// Es liest alle Variablen in .env ein und stellt sie uns unter process.env zur Verfügung.
import dotenv from "dotenv"
dotenv.config();

// Da die Variable __dirname nicht unter ESM existiert, müssen wir sie selbst erzeugen.
// Sie gibt uns den absoluten Pfad zum aktuellen Projektverzeichnis an.
// Das brauchen wir weiter unten zum Ausliefern von Dateien.
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import albumRouter from "./routes/albumRouter.js"
import photoRouter from "./routes/photoRouter.js"

const server = express()
// Anstatt den Port im Code festzulegen, greifen wir auf die Umgebungsvariable PORT zu.
// So lässt sich der Port in jeder Umgebung individuell anpassen, ohne den Code zu verändern.
const port = process.env.PORT || 3000;

server.use(express.json())

// In unserer Konfiguration muss CORS nicht mehr berücksichtigt werden,
// weil wir keine unterschiedlichen Origins mehr haben.
// server.use(cors({ origin: "http://localhost:3000" }))

// Die bisherigen API Endpoints wurden angepasst: Sie werden jetzt unter /api aufgeführt.
// So schaffen wir eine klare Trennung von Frontend und API.
server.use("/api/albums", albumRouter)
server.use("/api/photos", photoRouter)

server.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

// Mit res.sendFile können wir Dateien ausliefern. Hierzu richten wir wie gewohnt einen Endpoint mit Methode und Path ein.
// res.sendFile bekommt dann einen absoluten Pfad übergeben (wir benötigen hierzu __dirname), der auf die Datei zeigt.
// Der Client ruft also den Endpoint auf und erhält die angegebene Datei zurück.
server.get("/files/photos/:filename", (req, res) => {
    res.sendFile(__dirname + `/files/photos/${req.params.filename}`);
});


// Um das Frontend über das Backend auszuliefern, benötigen wir nur die folgenden zwei Zeilen.
// Die erste Zeile stellt mit express.static alle(!) Dateien in einem Verzeichnis zur Verfügung (ähnlich res.sendFile).
// Beispiel: GET /static/js/main.abcd1234.js liefert die Datei ./files/frontend/static/js/main.abcd1234.js zurück.
// Wird eine Seite (siehe React Router) im Frontend angefragt, sorgt die zweite Zeile dafür, dass die Anfrage immer auf index.html landet.
// -------------------------
server.use("/", express.static("./files/frontend"));
server.get("/*", (req, res) => res.sendFile(__dirname + "/files/frontend/index.html"));
// -------------------------

server.use((req, res) => {
    res.status(404).send("Diese Seite gibt es nicht :(")
})


server.use((err, req, res, next) => {
    console.log("Ein Fehler ist aufgetreten", err)
    res.status(500).send("Es liegt nicht an dir sondern an mir...")
})

server.listen(port, () => {
    console.log("Server is running on " + port)
})
