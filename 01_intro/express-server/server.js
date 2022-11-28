// Wir nutzen für unsere zukünftigen Server das Modul "express".
// Express bietet viele nützliche Funktionen,
// die unseren Code einfach und übersichtlich halten werden.
const express = require("express");
// import express from "express";

// Nach dem Import erstellen wir eine neue Server-Instanz,
// indem wir express() aufrufen.
const server = express();

// Endpoints einzurichten geht ganz einfach mit der neuen Server-Variable:
// Wir rufen die HTTP Method als JavaScript-Methode auf (server.get(), server.post(),...)
// und übergeben den Pfad und eine Callback-Function als Argumente.
// Die Callback-Function bekommt wie auch beim HTTP-Server die zwei Nachrichten request und response.
server.get("/photos", (request, response) => {
    console.log("GET /photos");
    const photos = [
        "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=600",
    ];

    // Express kümmert sich um die Einstellungen in unserer Antwort,
    // wir müssen also keine Header selbst setzen oder die Antwort beenden.
    // Ein einfacher Aufruf von response.json() reicht aus.
    response.json({ photos });
    // response.send("test");
});

server.get("/albums", (request, response) => {
    console.log("GET /albums");
    const albums = [];

    response.json({ albums });
    // response.send("test");
});

server.post("/photos", () => { });
server.put("/photos", () => { });
server.patch("/photos", () => { });
server.delete("/photos", () => { });

// Auch dieser Server muss natürlich wieder auf einen Port hören.
server.listen(4002);
