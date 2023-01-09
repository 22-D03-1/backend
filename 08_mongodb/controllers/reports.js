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

// PUT
export const replace = async (req, res) => {
    const id = req.params.id;
    const document = { ...req.body };

    // Da wir mit PUT einen Datensatz ersetzen wollen.
    // verwenden wir in MongoDB die Methode replaceOne().
    // Wir übergeben einen Filter wie bei find, findOne, deleteOne,...
    // Zusätzlich übergeben wir das neue Dokument,
    // welches das bisherige ersetzen soll.
    const result = await collection.replaceOne(
        { _id: ObjectId(id) },
        document,
        // {
        //     // wollen wir einen Datensatz, den wir nicht gefunden haben, neu anlegen,
        //     // können wir dies mit der Option upsert: true machen.
        //     // upsert liefert uns als result eine Übersicht,
        //     // ob ein Datensatz aktualisiert oder angelegt wurde.
        //     upsert: true,
        // },
    );

    res.status(200).json(result); // eigentlich 204, wegen result aber "nur" 200
}

// PATCH
export const update = async (req, res) => {
    const id = req.params.id;
    const data = { ...req.body };

    // Bei PATCH Requests wollen wir einen Datensatz nur modifizieren.
    // Daher verwenden wir hier die Methode updateOne().
    // Wie auch bei replaceOne() übergeben wir hier zuerst einen Filter.
    // Danach folgt allerdings ein Objekt mit sog. "Field Update Operators".
    // Geben wir $set den Wert unserer neuen Properties,
    // Wird das Dokument um diese Properties erweitert oder - falls bereits vorhanden - geändert.
    const result = await collection.updateOne(
        { _id: ObjectId(id) },
        {
            $set: data,
        },
    );

    res.status(200).json(result); // eigentlich 204, wegen result aber "nur" 200
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
