// Wir importieren alle Methoden unserer Models und fassen sie in Report zusammen.
import * as Report from "../models/Report.js";

export const getAll = async (req, res) => {
    // In diesem Controller greifen wir auf die Model-Methode getAll() zu, um alle Reports zu erhalten.
    const reports = await Report.getAll();
    res.json(reports);
};

export const create = async (req, res) => {
    // Hier rufen wir create() aus dem Model auf.
    // Dabei übergeben wir die relevanten Daten aus req.body an die Methode.
    // Wir hatten im Model definiert, dass wir drei Argumente übergeben können,
    // Alternativ ist natürlich auch ein Objekt oder jede andere Form von Argumenten möglich.
    const result = await Report.create(req.body.title, req.body.description, req.body.test);

    res.status(201).json(result);
}
