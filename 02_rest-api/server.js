import express from "express";
const app = express();

app.listen(4321, () => console.log("listening on port 4321"));

// API-Dokumentation
// ---------------------------
// ## Users
// POST    /users          201
// GET     /users          200
// GET     /users/:index   200
// PUT     /users/:index   204
// DELETE  /users/:index   204
//
// ## Notizen
// POST    /notizen        201
// GET     /notizen        200
// GET     /notizen/:index 200
// PUT     /notizen/:index 204
// DELETE  /notizen/:index 204


// Unsere Testdaten. Dies dient nur zur Veranschaulichung
// und sollte so nicht in ernsthaften Projekten zum Speichern von Daten genutzt werden.
let notizen = [1, 2, 3];
let users = ["a", "b", "c"];

// Users lesen (GET)
// Mit der GET Methode fragen Clients Daten an (cRud -> Read)
// Der Pfad gibt dabei den Ressourcentyp an, der angefragt wird.
app.get("/users", (req, res) => {
    res.json(users);
});

// Wir können neben allen Datensätzen auch einzelne zur Verfügung stellen.
// Hierfür benötigen wir eine Möglichkeit, einen bestimmten Datensatz zu identifizieren.
// Wir nutzen hierfür Params und greifen darüber in der Regel auf IDs zu.
// In unserem einfachen Beispiel ist es wegen der Arrays der Index.
app.get("/users/:index", (req, res) => {
    const index = +req.params.index;
    res.json(users[index]);
});

// Neuen User erstellen (POST)
// Mit der Methode POST fragen Clients die Erzeugung eines neuen Datensatzes an (Crud -> Create)
app.post("/users", (req, res) => {
    users.push(users.length + 1);
    res.status(201).json(users.length);
});

// User aktualisieren/bearbeiten (PUT/PATCH)
// Mittels PUT oder PATCH sollen Datensätze bearbeitet werden können (crUd -> Update)
// PUT wird verwendet, um Datensätze komplett auszutauschen,
// während PATCH zum Anpassen einzelner Eigenschaften verwendet wird.
app.put("/users/:index", (req, res) => {
    const index = +req.params.index;
    users[index] = "zzz";

    // Variante 1:
    // Entweder antworten wir mit einer leeren Antwort und senden den Statuscode 204 No Content...
    // res.status(204).end();

    // Variante 2:
    // ...oder wir senden den aktualisierten Datensatz in der Antwort zurück.
    res.json(users[index]);
});

// User löschen (DELETE)
// Mit DELETE fragen Clients die Löschung eines Datensatzes an (cruD -> DELETE)
app.delete("/users/:index", (req, res) => {
    const index = +req.params.index;
    users.splice(index, 1);
    res.status(204).end();
});

// =============================================

// Notizen lesen (GET)
app.get("/notizen", (req, res) => {
    res.json(notizen);
});

// Neue Notiz erstellen (POST)
app.post("/notizen", (req, res) => {
    notizen.push(notizen.length + 1);
    res.json();
});

// Notiz aktualisieren/bearbeiten (PUT/PATCH)
app.put("/notizen", (req, res) => {
    const index = notizen.length - 1;
    notizen[index] = notizen[index] * 2;
    res.json();
});

// Notiz löschen (DELETE)
app.delete("/notizen", (req, res) => {
    notizen.pop();
    res.json();
});


// Notiz-App
// -------------------------------
/*
// REST API
// REpresentational State Transfer

- Neue Notiz erstellen (POST)
- Notizen lesen (GET)
- Notiz aktualisieren/bearbeiten (PUT/PATCH)
- Notiz löschen (DELETE)

PUT: Überschreiben des Datensatzes
PATCH: Bearbeiten des bestehenden Datensatzes

const task = {
    id: 123,
    title: "my task",
    description: ".....",
    date: "2022-12-05",
    done: false,
};

// PUT
const newTask = {
    id: 123,
    title: "my task",
    description: ".....",
    date: "2022-12-05",
    done: true,
};

// PATCH
const updates = {
    done: true,
};

// Ergebnis
const updatedTask = {
    id: 123,
    title: "my task",
    description: ".....",
    date: "2022-12-05",
    done: true,
};



Wichtige Status Codes
===================================
1xx => Info

2xx => OK
200 OK
201 Created
204 No Content

3xx => Redirects

4xx => Client Error
400 Client Error
401 Unauthorized
403 Forbidden
404 Not Found

5xx => Server Error
500 Server Error
*/
