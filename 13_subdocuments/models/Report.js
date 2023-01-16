import mongoose from "mongoose";

// Wollen wir unseren Daten eine bessere Struktur geben, können wir SubDocuments einsetzen.
// Das sind Objekte innerhalb eines Dokuments.
// Diese beinhalten eigene Properties und können mit Mongoose über ein Schema definiert werden.
// Dazu erzeugen wir ein neues Schema...
const authorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
}, {
    _id: false,
});

// ...und verwenden es an der gewünschten Stelle wie einen "type":
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    author: {
        type: authorSchema,
        required: true,
    },
    authors: [authorSchema],
}, {
    versionKey: false,
});

const Report = mongoose.model("Report", schema);

export const getAll = async () => {
    const reports = await Report.find();
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
