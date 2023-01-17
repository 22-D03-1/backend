import { faker } from "@faker-js/faker";
import Report from "./models/Report.js";
import Author from "./models/Author.js";
import "./lib/mongoose.js";

// Unser Seed Script wird jetzt langsam größer.
// Für das zweite Model haben wir alle Funktionen kopiert,
// die wir auch schon für die Reports verwendet hatten:
// deleteAuthors, createAuthor, createAuthors.
// Außerdem haben wir die neuen Funktionen in der Hauptlogik aufgerufen.

const deleteReports = async () => {
    return await Report.deleteMany();
}
const deleteAuthors = async () => {
    return await Author.deleteMany();
}

// Um die Referenzen in den Reports speichern zu können,
// benötigen wir zuerst die IDs der neu erstellten Authors.
// Diese speichern wir in einem Array authors zwischen,
// welches von createAuthor() gefüllt wird.
const authors = [];

const createReport = async () => {
    const report = new Report({
        title: faker.lorem.sentences(1),
        description: faker.lorem.sentences(),
        // Beim Erstellen eines Reports nutzen wir das authors-Array
        // und suchen uns die ID eines beliebigen Authors heraus.
        // Hier könnt ihr kreativ werden, wie ihr den Index bestimmt.
        author: authors[0],
    });

    await report.save();
}
const createAuthor = async () => {
    const author = new Author({
        firstName: faker.hacker.adjective(),
        lastName: faker.hacker.noun(),
        email: faker.internet.email(),
    });

    // Wir holen uns die ID aus der Rückmeldung von save()
    // und fügen sie an das authors-Array an.
    const result = await author.save();
    authors.push(result._id);
};

const createReports = async (count = 20) => {
    for (let i = 0; i < count; i++) {
        console.log("creating report: ", i + 1);
        await createReport();
    }
}
const createAuthors = async (count = 20) => {
    for (let i = 0; i < count / 4; i++) {
        console.log("creating author: ", i + 1);
        await createAuthor();
    }
}

try {
    if (!process.argv.includes("doNotDelete")) {
        console.log("deleting all records...");
        await deleteReports();
        await deleteAuthors();
        console.log("done.");
    }

    console.log("creating new records...");
    const count = process.argv[2] === "doNotDelete" ? undefined : process.argv[2];
    await createAuthors(count);
    console.log(authors);
    await createReports(count);
    console.log("done.");

    console.log("seeding finished. happy coding!");
    process.exit(0);
} catch (error) {
    console.error(error);
    process.exit(1);
}
