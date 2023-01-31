Erstelle zwei Versionen der gleichen App mit unterschiedlichen Access Control Modellen.
Überlege dir, wie du die Modelle geschickt implementieren kannst.
Verzichte zunächst auf eine Datenbankanbindung. Diese kannst du später noch hinzufügen, konzentriere dich zuerst auf Access Control.
Nutze das users-Array in routes/auth.js, um dir passende Testuser anzulegen. Bearbeite die bestehenden User oder füge weitere hinzu.
Lege die Rollen und möglichen Attribute an einem zentralen Platz ab, von dem aus du sie importieren kannst. So sparst du dir sicher die eine oder andere Kopie.

1. Role-Based Access Control (RBAC)
Sichere die Routen unter /protected-routes folgendermaßen ab:
Alle eingeloggten User dürfen Daten auslesen (GET).
Editors dürfen Inhalte erstellen (POST) und bearbeiten (PUT).
Admins dürfen Inhalte löschen (DELETE).

2. Discretionary Access Control (DAC)
Sichere die Routen unter /protected-routes folgendermaßen ab:
User 1 darf ausschließlich lesen (GET).
User 2 darf lesen, bearbeiten und löschen (GET, PUT, DELETE).
User 3 darf erstellen (POST).
User 4 darf lesen, erstellen und bearbeiten (GET, POST, PUT).
