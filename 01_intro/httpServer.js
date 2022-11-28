// import http from "http"; // ES Modules
const http = require("http"); // CommonJS Modules

// console.log(http);
console.log("starting server...");
// Mit dem http-Modul lässt sich ein Server erstellen,
// der auf Requests reagieren kann.
// An die Funktion createServer() übergeben wir eine Callback Function,
// die zwei Parameter enthält: request & response.
// Diese stellen die Anfrage des Clients und die Antwort des Servers dar.
const server = http.createServer((request, response) => {
    // In request sind viele nützliche Informationen zur Anfrage enthalten,
    // bspw. die HTTP Method und die angefragte URL.
    console.log("getting a request!", request.method, request.url);

    // Wir können anhand request.url den Pfad unterscheiden
    // und entsprechend mit anderen Antworten reagieren.
    switch (request.url) {
        case "/photos": {
            const photos = [
                "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=600",
                "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=600",
            ];

            console.log("requested photos");

            // Über response bauen wir unsere Antwort an den Client auf.
            // Wir können den Datentyp der Antwort über die HTTP Headers definieren.
            response.setHeader("Content-Type", "application/json"); // MIME Types
            // Geben wir einen falschen Content-Type an, versucht der Client,
            // die Antwort entsprechend zu interpretieren.
            // response.setHeader("Content-Type", "image/jpeg"); // MIME Types

            // Zur Übermittlung von Daten verwenden wir response.write.
            // Hier sind nur sehr wenige Datentypen erlaubt,
            // weshalb wir unsere Daten in diesem Fall erst in einen String umwandeln müssen.
            response.write(JSON.stringify(photos));
            // Da wir die Verbindung zum Client geöffnet halten,
            // bis unsere Antwort abgeschlossen ist,
            // müssen wir sie noch mit response.end() beenden.
            response.end();
            break;
        }

        case "/albums": {
            console.log("requested albums");
            response.write("my albums");
            response.end();
            break;
        }
    }
});

// Der Server soll auf einen bestimmten Port hören.
// Nur so ist es möglich, via HTTP mit ihm zu kommunizieren.
server.listen(4001);
