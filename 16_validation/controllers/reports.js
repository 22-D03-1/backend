import * as Report from "../models/Report.js";

const sendMail = () => { };

export const getAll = async (req, res) => {
    const reports = await Report.getAll();
    res.json(reports);
};

export const create = async (req, res) => {
    // Die erste Idee, die übermittelten Daten zu überprüfen, war im Controller selbst.
    // Hier greifen wir auf die einzelnen Properties in req.body zu
    // und prüfen auf die Einhaltung unserer Regeln.

    // console.log(req.body.email, req.body.email.includes("@"), req.body.email.length > 0);

    // Variante 1 - if/else
    // -------------------------------
    // if (req.body.email.includes("@") && req.body.email.length > 0) {
    //     const result = await Report.create(req.body.title, req.body.description);
    //     sendMail(req.body.email);
    //     res.status(201).json(result);
    // } else {
    //     res.status(400).json("valid email address is required");
    // }

    // Variante 2 try/catch
    // -------------------------------
    // try {
    //     if (!req.body.email.includes("@") || !req.body.email.length > 0) {
    //         throw new Error("valid email address is required");
    //     }
    //     if (!req.body.username.length > 0) {
    //         throw new Error("username is required");
    //     }

    //     const result = await Report.create(req.body.title, req.body.description);
    //     sendMail(req.body.email);
    //     res.status(201).json(result);
    // } catch (error) {
    //     res.status(400).json(error.message);
    // }

    // Variante 3 - Guard Clause
    // -------------------------------
    // if (!req.body.email.length > 0) {
    //     return res.status(400).json("email address is required");
    // }
    // // email ist länger als 0 Zeichen lang

    // if (!req.body.email.includes("@")) {
    //     return res.status(400).json("email must contain @");
    // }
    // // email enthält ein @-Zeichen

    // if (!req.body.username.length > 0) {
    //     return res.status(400).json("username is required");
    // }
    // // username ist länger als 0 Zeichen lang

    const result = await Report.create(req.body.title, req.body.description);

    // Dummy-funktion (Stub) für die Verwendung der email Property.
    // email wird nicht in der Datenbank gespeichert, läuft also nicht durch unser Model.
    // Somit erfolgt auch keine Validierung durch das Mongoose Schema.
    // Prüfen wir email nicht selbst, kann es passieren, dass sendMail Probleme macht, z.B. wenn jemand Zahlen übergibt, ein Array mit vielen Elementen, ein Objekt,...
    sendMail(req.body.email);
    res.status(201).json(result);
}

export const remove = async (req, res) => {
    const result = await Report.remove(req.params.id);

    if (result.deletedCount > 0) return res.status(204).end();
    res.status(404).end();
}
