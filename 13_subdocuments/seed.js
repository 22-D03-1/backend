import { faker } from "@faker-js/faker";
import Report from "./models/Report.js";
import "./lib/mongoose.js";

const deleteReports = async () => {
    return await Report.deleteMany();
}

const createAuthor = () => ({
    firstName: faker.hacker.adjective(),
    lastName: faker.hacker.noun(),
});

const createReport = async () => {
    const report = new Report({
        title: faker.lorem.sentences(1),
        description: faker.lorem.sentences(),
        author: createAuthor(),
        authors: [createAuthor(), createAuthor(), createAuthor()],
    });

    await report.save();
}

const createReports = async (count = 20) => {
    for (let i = 0; i < count; i++) {
        console.log("creating report: ", i + 1);
        await createReport();
    }
}

try {
    if (!process.argv.includes("doNotDelete")) {
        console.log("deleting all records...");
        await deleteReports();
        console.log("done.");
    }

    console.log("creating new records...");
    const count = process.argv[2] === "doNotDelete" ? undefined : process.argv[2];
    await createReports(count);
    console.log("done.");

    console.log("seeding finished. happy coding!");
    process.exit(0);
} catch (error) {
    console.error(error);
    process.exit(1);
}
