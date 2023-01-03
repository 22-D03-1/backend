// Wir importieren hier unsere Datenbank-Referenz.
// Um die Verbindung kümmert sich unsere Library.
import db from "../lib/mongodb.js";
import { ObjectId } from "mongodb";

// Wir greifen auf unsere Collection "reports" zu
// und speichern diese Referenz in einer Variable.
// So müssen wir in den einzelnen Controllern weniger Code schreiben.
const collection = db.collection("reports");

export const getAll = async (req, res) => {
    // Mit collection können wir beliebige Anfragen an die Datenbank senden.
    const reports = await collection.find().toArray();
    res.json(reports);
};

export const getOne = async (req, res) => {
    // Statt find() können wir auch findOne() verwenden,
    // wenn wir nur einen Datensatz suchen.
    // Damit wir ihn anhand der ID finden können,
    // muss diese zuerst in eine ObjectId umgewandelt werden.
    const report = await collection.findOne({ _id: ObjectId(req.params.id) });
    res.json(report);
};

export const update = async (req, res) => {
    const id = req.params.id;
    // TODO
    res.status(204).end();
}

export const remove = async (req, res) => {
    // Zum Löschen einzelner Datensätze verwenden wir deleteOne().
    // Das funktioniert genauso wie findOne() über bspw. eine ID.
    await collection.deleteOne({ _id: ObjectId(req.params.id) });
    res.status(204).end();
}

export const create = async (req, res) => {
    // Neue Einträge erstellen wir mit insertOne().
    // Die Methode löst mit einem Objekt auf, das u.a. die neue ID enthält.
    const result = await collection.insertOne({ ...req.body });
    res.status(201).json(result);
}
