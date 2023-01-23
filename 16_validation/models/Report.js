import mongoose from "mongoose";
import Author from "./Author.js";

// Da wir den Author ausgelagert haben in ein eigenes Model,
// müssen wir ihn nun mit unseren Reports verknüpfen können.

// Wir haben festgestellt:
// Ein Author kann mehrere Reports schreiben.
// Ein Report wird nur von einem Author geschrieben.
// Wir haben es hier also mit einer 1:n-Beziehung zu tun (1 Author, n Reports).
// Bei 1:n-Beziehungen speichern wir in der Regel die Beziehung in der n-Seite.
// In MongoDB wäre es auch auf der 1-Seite als Array möglich.
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },

    // Den Author weisen wir in Mongoose mit einer Referenz zu.
    // Hierfür verwenden wir "ref" und den Namen des Models.
    // Als type geben wir ObjectId an, welches wir finden unter
    // mongoose.Schema.Types.ObjectId
    // So kann Mongoose eine Verbindung zwischen den beiden Collections/Models herstellen
    // und überprüfen, ob der Datentyp auch wirklich einer ObjectId entspricht.
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
    },
}, {
    versionKey: false,
});

const Report = mongoose.model("Report", schema);

export const getAll = async () => {
    const reports = await Report.find().populate("author");

    // const result = await Promise.all(reports.map(async report => {
    //     return {
    //         ...report._doc,
    //         author: await Author.findOne({ _id: report.author }),
    //     }
    // }));
    // return result;

    return reports;
}

// ACHTUNG: In diesem Beispiel wird create() nicht funktionieren,
// da author als Pflichtfeld angegeben ist.
export const create = async (title, description) => {
    const newReport = new Report({ title, description });
    const result = await newReport.save();
    return result;
}

export const remove = async id => {
    return await Report.deleteOne({ _id: id });
}

export default Report;
