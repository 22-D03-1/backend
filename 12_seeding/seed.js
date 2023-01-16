/*
Seed-Skripte sind sehr nützliche Helfer, die uns die Datenbank mit Testdaten befüllen.
Wir schaffen uns quasi auf Knopfdruck genügend Datensätze,
um damit alle Funktionen in unserer Anwendung zu entwickeln und zu testen.
Würden wir diese Datensätze manuell anlegen, dauert es viel zu lange und ist sehr fehleranfällig.
Außerdem wollen wir ja programmieren und nicht hunderte Namen ausdenken müssen, oder?

Seed-Skripte helfen uns auch immer dann, wenn wir Daten in unserer Testdatenbank kaputt gemacht haben.
Mit einem Aufruf sind wieder neue, funktionierende Datensätze vorhanden und die alten gelöscht.

Seed-Skripte sollten nur in Test-/Entwicklungsdatenbanken ausgeführt werden, NIEMALS im Produktivsystem!
Wir legen spätestens zum Deployment eine neue Datenbank an und verweisen darauf in der Environment des Produktivsystems.

--------------------

Folgende Schritte wollen wir hier abarbeiten, um unser Seed-Skript zu erstellen:
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

import { faker } from "@faker-js/faker";

// Wir verwenden die bereits vorhandenen Models in unserem Seed-Skript.
import Report from "./models/Report.js";
// Da wir auch die Datenbankverbindung schon erstellt haben,
// nutzen wir sie hier einfach mit einem Import.
import "./lib/mongoose.js";

// Wir lagern die einzelnen Schritte in Teilfunktionen aus.
// So behalten wir den Überblick und können die Schritte besser debuggen,
// wenn mal etwas schiefgehen sollte.
const deleteAll = async () => {
    // Wir löschen alle Einträge aus der Collection "reports" mittels deleteMany()
    return await Report.deleteMany();
}

// Diese Funktion erzeugt und speichert genau einen Datensatz.
const createReport = async () => {
    // Wir erzeugen einen Datensatz, indem wir die Properties gemäß des Schemas anlegen.
    // Hierbei hilft uns faker, damit wir uns nicht selbst etwas ausdenken müssen.
    const report = new Report({
        title: faker.lorem.sentences(1),
        description: faker.lorem.sentences(),
    });

    // Anschließend speichern wir den Datensatz in der Datenbank.
    await report.save();
}

// Da wir mehr als nur einen Datensatz erzeugen wollen,
// lassen wir in dieser Funktion eine Schleife mit createReport() laufen.
// Über den Parameter count können wir die Anzahl der Datensätze verändern.
const createReports = async (count = 1) => {
    for (let i = 0; i < count; i++) {
        console.log("creating report: ", i + 1);
        await createReport();
    }
}


// In diesem try/catch Block läuft unsere Hauptlogik ab.
// Hier rufen wir die oben definierten Funktionen auf.
// Durch die Trennung behalten wir den Überblick.
try {
    console.log("deleting all records...");
    await deleteAll();
    console.log("done.");

    console.log("creating new records...");
    await createReports(10);
    console.log("done.");

    console.log("seeding finished. happy coding!");
    process.exit(0);
} catch (error) {
    console.error(error);
    process.exit(1);
}
