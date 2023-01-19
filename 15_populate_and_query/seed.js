import { faker } from "@faker-js/faker";

// Wir verwenden die bereits vorhandenen Models in unserem Seed-Skript.
import Photo from "./models/Photo.js";
import Photographer from "./models/Photographer.js";
import Album from "./models/Album.js";
// Da wir auch die Datenbankverbindung schon erstellt haben,
// nutzen wir sie hier einfach mit einem Import.
import "./lib/connect_db.js";


const photographers = []
const albums = []

const deleteAll = async () => {
    await Photo.deleteMany();
    await Photographer.deleteMany();
    await Album.deleteMany();
}

// Diese Funktion erzeugt und speichert genau einen Datensatz.
const createPhoto = async (photographer, album) => {
    // Wir erzeugen einen Datensatz, indem wir die Properties gemäß des Schemas anlegen.
    // Hierbei hilft uns faker, damit wir uns nicht selbst etwas ausdenken müssen.
    const photo = new Photo({
        price: faker.commerce.price(),
        url: faker.image.imageUrl(1234, 2345, undefined, true),
        date: faker.date.past(),
        theme: faker.word.noun(),
        photographer,
        albums: [album]
    });

    // Anschließend speichern wir den Datensatz in der Datenbank.
    await photo.save();
}

const createAlbum = async () => {
    const album = new Album({
        name: faker.random.word(),
        description: faker.lorem.text()
    })

    const result = await album.save()
    albums.push(result["_id"])
}

const createPhotographer = async () => {
    const photographer = new Photographer({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        address: {
            street: faker.address.street(),
            houseNumber: faker.address.buildingNumber(),
            country: "Iran"
        }
    })

    const result = await photographer.save()
    photographers.push(result["_id"])
}

// Da wir mehr als nur einen Datensatz erzeugen wollen,
// lassen wir in dieser Funktion eine Schleife mit createReport() laufen.
// Über den Parameter count können wir die Anzahl der Datensätze verändern.
const createData = async (count = 20) => {
    for (let i = 0; i < count; i++) {
        await createPhotographer();
        await createAlbum()

        for (let j=0; j < 30; j++) {
            await createPhoto(photographers[i], albums[i])
        }
    }
}

// In diesem try/catch Block läuft unsere Hauptlogik ab.
// Hier rufen wir die oben definierten Funktionen auf.
// Durch die Trennung behalten wir den Überblick.
try {
    if (!process.argv.includes("doNotDelete")) {
        console.log("deleting all records...");
        await deleteAll();
        console.log("done.");
    }

    console.log("creating new records...");
    const count = process.argv[2] === "doNotDelete" ? undefined : process.argv[2];
    await createData(count);
    console.log("done.");

    console.log("seeding finished. happy coding!");
    process.exit(0);
} catch (error) {
    console.error(error);
    process.exit(1);
}
