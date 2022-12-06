Aufgabe 1
=================
Wir wollen eine neue API erstellen, mit der unsere Kursinformationen abgerufen und verwaltet werden können. Zuerst müssen wir aber ein wenig planen.

Folgende Ressourcen-Typen benötigen wir:

- Kurse
- Teilnehmer
- Module/Inhalte

Für alle drei Ressourcen-Typen sollen CRUD-Operationen über die API verfügbar sein. Außerdem soll jede einzelne Ressource erreichbar sein. Plane die entsprechenden Endpoints und überlege dir auch, welche Statuscodes in welchen Situationen zurückgesendet werden können.


Aufgabe 2
=================
Plane eine API für einen Online-Shop. Wir betrachten die API nur aus Kundensicht, wir benötigen also keine Verwaltung des Angebots.

Folgende Ressourcen-Typen sollen dabei zur Verfügung stehen:

- Produkte
- Benutzerkonten
- Bestellungen

Folgende Anforderungen müssen berücksichtigt werden. Gib für jede Anforderung eine Beispielanfrage (Methode, Pfad, mögliche Statuscodes) an:

1. Produkte werden Kategorien zugeordnet und sollen nach der Kategorie gefiltert werden können.
2. Benutzer können sich ein eigenes Benutzerkonto anlegen.
3. Benutzer können ihr eigenes Benutzerkonto bearbeiten und löschen.
4. Bestellungen sollen nur für das eigene Benutzerkonto ausgelesen werden.
