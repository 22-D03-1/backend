import dotenv from "dotenv";
dotenv.config();

import express from "express";
import reportsRouter from "./routes/reports.js";
const app = express();

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}`));

import logMiddleware from "./middlewares/log.js";
app.use(logMiddleware);

app.use(express.json());
app.use("/reports", reportsRouter);


// -------------------------
// Modifizierter Beispielcode von mongodb.com
// Dieser Code ist nur zur Demo gedacht
// und wurde umgebaut und in ./lib/mongodb.js wiederverwendbar gemacht
// -------------------------
import { MongoClient, ServerApiVersion } from "mongodb";

// Ganz wichtig: Der Connection String darf niemals direkt im Code stehen!
// Nutzt eine Environment-Variable in .env dafür.
const uri = process.env.MONGODB_URI;

// Wir erzeugen eine neue Instanz der Klasse MongoClient.
// Hiermit greifen wir auf die Datenbank zu.
// Der Client bildet das Grundgerüst für alle Aktionen,
// die wir mit der Datenbank ausführen möchten.
// Wir übergeben hier den Connection String/URI und ein Options-Objekt.
// Die Options sind in diesem Falle vorgegeben.
// Wir werden demnächst noch genauer schauen, was sie bedeuten.
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Bevor wir etwas mit der Datenbank anstellen können,
// müssen wir unseren Client verbinden.
// Ist die Verbindung hergestellt, wird die übergebene Callback Function ausgeführt.
client.connect(async err => {
    // In der Callback Function können wir nun mit der Verbindung arbeiten.
    // Wir legen zuerst die Datenbank fest.
    const db = client.db("journal");
    // Dann rufen wir die gewünschte Collection auf.
    const reportsCollection = db.collection("reports");
    // Anschließend fragen wir die Datensätze ab.
    // Wichtig: find() liefert uns noch nicht die konkreten Datensätze,
    // sondern "zeigt" nur darauf.
    // Mit toArray() sagen wir jetzt, dass uns die Datensätze
    // in einem Array ausgeliefert werden sollen.
    // Da toArray() ein Promise zurückgibt, müssen wir auf die Ergebnisse warten.
    const reports = await reportsCollection.find().toArray();
    console.log(reports);

    // Anstatt alle Schritte einzeln auszuführen, können wir sie auch verketten.
    // Das sorgt für deutlich weniger Code und weniger Variablen,
    // bei längeren Verkettungen leidet allerdings die Lesbarkeit.
    console.log(await client.db("journal").collection("reports").find().toArray());

    // Wir können mit close() die Verbindung zur Datenbank schließen.
    client.close();
});
// --------------------
