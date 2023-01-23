import mongoose from "mongoose";

// Um Authors nicht mehrfach/redundant in der Datenbank zu speichern,
// nehmen wir sie als SubDocuments aus den Reports heraus
// und legen sie in einer eigenen Collection ab.
// Hierfür erstellen wir ein neues Model, welches einen einzelnen Author beschreibt.
const schema = new mongoose.Schema({
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
    versionKey: false,
});

const Author = mongoose.model("Author", schema);

export default Author;
