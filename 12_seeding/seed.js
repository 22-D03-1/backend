/*
TODO
x (- Faker-Package installieren)
x (- npm Script einrichten)

x - Faker importieren
x - Models importieren
x - Verbindung zur DB herstellen
x - Collections leeren (deleteMany())
x - 100 Datensätze laut Schema erzeugen (einzelne Objekte, die als Documents gespeichert werden)
x - Datensätze in DB speichern
x - Error Handling
*/
console.log("run seed script");

import { faker } from "@faker-js/faker";
import Report from "./models/Report.js";
import "./lib/mongoose.js";

const deleteAll = async () => {
    return await Report.deleteMany();
}

// Variante A:
// Array erstellen
// Objekte in Array pushen
// Array in DB speichern

// Variante B:
const createReport = async () => {
    // 1 Datensatz erzeugen:
    const report = new Report({
        title: faker.lorem.sentences(1),
        description: faker.lorem.sentences(),
    });

    // Datensätze in DB speichern
    await report.save();
}

const createReports = async (count = 1) => {
    for (let i = 0; i < count; i++) {
        console.log("creating report: ", i + 1);
        await createReport();
    }
}


try {
    // Collections leeren (deleteMany())
    await deleteAll();

    // 100 Datensätze laut Schema erzeugen (einzelne Objekte, die als Documents gespeichert werden)
    await createReports(10);

    process.exit(0);
} catch (error) {
    console.error(error);
    process.exit(1);
}
