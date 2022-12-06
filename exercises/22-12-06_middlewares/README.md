Unsere Kursverwaltung wird erweitert! Wir wollen einige Änderungen vornehmen, die mit Middlewares gut umzusetzen sind.

1. Richte eine Middleware ein, die sämtliche Anfragen im Terminal loggt.
2. Fange "Not Found"-Fehler ab und beantworte die Fehler selbst mit dem Statuscode 404.

Bei POST, PUT und PATCH können wir einen Body in der Anfrage verwenden. Damit wir die Daten im Backend verarbeiten können, müssen wir sie aber zuerst umwandeln(ähnlich dem `response.json()` bei `fetch()`).
Hierzu verwenden wir die Middleware `express.json()`, die wir folgendermaßen einbinden: `app.use(express.json())`.
Anschließend sind die übermittelten Daten in `req.body` enthalten.

1. Richte diese "Body Parser" Middleware in deinem Server ein.
2. Teste sie, indem du an POST /participants ein paar Informationen übermittelst und in der Antwort oder im Terminal ausgibst.
3. Lege dir ein leeres Array `participants` an in server.js und speichere die übermittelten Daten darin. Überlege dir, wie du eine passende ID erzeugen kannst.

1. Überprüfe beim POST /participants, ob das Alter `age` größer oder gleich 18 ist. Falls nicht, gib einen Fehler zurück und speichere den Datensatz nicht.
2. Überprüfe außerdem, ob Vor- und Nachname und die E-Mail-Adresse übermittelt wurden. Falls nicht, gib einen Fehler zurück und speichere den Datensatz nicht.

```
[
    {
      id: 1,
      firstName: "Shannah",
      lastName: "Curton",
      email: "scurton0@weather.com",
      age: 46,
    }, {
      id: 2,
      firstName: "Arvie",
      lastName: "Stading",
      email: "astading1@drupal.org",
      age: 39,
    }, {
      id: 3,
      firstName: "Cassandry",
      lastName: "Parcells",
      email: "cparcells2@foxnews.com",
      age: 23,
    }
]
```
