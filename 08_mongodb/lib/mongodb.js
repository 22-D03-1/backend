// Diese Library verbindet sich mit MongoDB,
// wählt eine Datenbank aus und gibt deren Referenz zurück.
// Weil dieses JS Modul nur einmalig evaluiert (ausgeführt) wird,
// können wir es beliebig oft importieren und nutzen immer die gleiche Verbindung.

// Da wir auf Variablen in .env zugreifen,
// importieren wir dotenv und führen config() aus.
import dotenv from "dotenv";
dotenv.config();
import { MongoClient, ServerApiVersion } from "mongodb";

// Wir stellen sicher, dass beide benötigten Variablen
// in der Environment verfügbar sind.
// Falls nicht, wird ein Fehler geworfen.
if (!process.env.MONGODB_URI || !process.env.DATABASE)
    throw new Error("no database connection string or database name provided");

// Wir verbinden uns mit MongoDB über MongoClient.connect().
// Da wir ein Promise zurückbekommen, müssen wir auf die Verbindung warten.
const connection = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Ein kurzer Hinweis im Terminal zeigt uns,
// dass die Datenbankverbindung einsatzbereit ist.
console.log("connection established");

// Wir wählen jetzt noch die passende Datenbank aus...
const db = connection.db(process.env.DATABASE);

// ...und exportieren sie zur weiteren Verwendung.
export default db;
