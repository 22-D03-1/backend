import * as Report from "../models/Report.js";

export const getAll = async (req, res) => {
    const reports = await Report.getAll();
    res.json(reports);
};

export const create = async (req, res) => {
    const result = await Report.create(req.body.title, req.body.description, req.body.test);

    res.status(201).json(result);
}

export const remove = async (req, res) => {
    const result = await Report.remove(req.params.id);

    if (result.deletedCount > 0) return res.status(204).end();
    res.status(404).end();
}
