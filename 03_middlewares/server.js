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


let notizen = [1, 2, 3];
let users = ["a", "b", "c"];

// Middlewares
// Middlewares sind Funktionen, die unsere Anfragen schrittweise durchlaufen.
// Wir können mit Middlewares Aktionen ausführen und dann mit "next()" zum nächsten Schritt weiterleiten.
// Mittels app.use() registrieren wir Middlewares, die auf sämtliche Anfragen hören.
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// Soll die Middleware nur unter bestimmten Pfaden aktiv sein,
// können wir diesen zusätzlich angeben.
// Nur Anfragen unter /notizen werden hier landen.
app.use("/notizen", (req, res, next) => {
    console.log("Middleware für /notizen");
    console.log("Aktueller Stand der Notizen:", notizen);
    next();
});

// Ähnliches können wir auch mit Methoden machen.
// Statt use() verwenden wir die passende Methode und geben als Pfad "*" an.
app.get("*", (req, res, next) => {
    console.log("Middleware für GET");
    next();
});

// Beides kombiniert kennen wir bereits von unseren Endpoints.
app.get("/users", (req, res, next) => {
    console.log("Middleware für GET /users");
    next();
});

// Sollte ein Fehler auftreten, können wir next() mit diesem Fehler aufrufen.
// Dadurch überspringen wir alle weiteren Middlewares,
// bis wir bei einem Error Handler landen (auch eine Middleware)
app.use((req, res, next) => {
    const serverOk = Math.random() >= 0.5;

    if (!serverOk) return next(new Error("Der Server ist nicht OK"));
    // vergleichbar mit: throw new Error("Der Server ist nicht OK")

    next();
});


// Controller
app.get("/users", (req, res, next) => {
    console.log("Endpoint");
    res.json(users);
    next();
});

app.get("/users/:index", (req, res) => {
    const index = +req.params.index;
    res.json(users[index]);
});

app.post("/users", (req, res) => {
    users.push(users.length + 1);
    res.status(201).json(users.length);
});

app.put("/users/:index", (req, res) => {
    const index = +req.params.index;
    users[index] = "zzz";

    res.status(204).end();
});

app.delete("/users/:index", (req, res) => {
    const index = +req.params.index;
    users.splice(index, 1);
    res.status(204).end();
});

app.get("/notizen", (req, res) => {
    res.json(notizen);
});

app.post("/notizen", (req, res) => {
    notizen.push(notizen.length + 1);
    res.json();
});

app.put("/notizen", (req, res) => {
    const index = notizen.length - 1;
    notizen[index] = notizen[index] * 2;
    res.json();
});

app.delete("/notizen", (req, res) => {
    notizen.pop();
    res.json();
});

// Wir können auch Middlewares am Ende der Datei registrieren.
// Diese werden dann also zum Schluss ausgeführt.
// Aber natürlich nur, wenn per next() weitergemacht wurde.
app.use((req, res) => {
    console.log("Letzte Middleware");
    res.status(404).end();
});

// Hat eine Middleware vier Parameter, sprechen wir von einem Error Handler
// Hier enthält der erste Parameter den Fehler, der an next() übergeben wurde.
app.use((error, req, res, next) => {
    console.log("Fehler:", error);
    res.status(500).end();
    next("test");
});

// Fun Fact: Auch Error Handler lassen sich mit next() verketten.
app.use((error, req, res, next) => {
    console.log("Fehler:", error);
});
