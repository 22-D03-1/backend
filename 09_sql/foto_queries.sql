/*
Die meiste Power entwickelt SQL bei der Abfrage von Daten also dem R unseres CRUD. 
Das funktioniert deutlich besser als bei MongoDB, weswegen SQL oft für Data Warehouses
genutzt wird um Datenanalysen zu machen. 

Der Grundbefehl um Daten abzufragen ist SELECT gefolgt von den Spalten/Attribute die wir haben wollen.
Wenn wir * benutzen wollen wir alle Attribute haben. Ansonsten können wir diese mit Komma getrennt aufzählen.
Danach sagen wir aus welcher Tabelle wir die Daten haben wollen mit FROM gefolgt von dem Datennamen.

Ähnlich wie die anderen SQL Befehle liest es sich wie normales englisch:
select name from album. Zu deutsch: Wähle Namen aus Album
*/

SELECT * 
FROM album;

SELECT name, id 
FROM album;

/*
Wir sind außerdem in der Lage unsere Abfrage zu filtern also an eine Bedingung zu knüpfen. Ähnlich wie in
Javascript if. Dafür nutzen wir WHERE und dann den Vergleich den wir machen wollen.
WHERE id=1 gibt nur den einen einen Eintrag mit der Id 7
WHERE preis > 14 gibt alle Einträge, die einen Preis haben der größer ist als 14
WHERE thema = "people" gibt alle Einträge bei dem das Thema people angegeben wurde
*/
SELECT name
FROM album 
WHERE id=1;

/*
In Javascript nutzen wir || und && um zwei Bedingungen miteinander zu verknüpfen. IN SQL nutzen wir AND und OR.
AND heisst, dass beide Bedingungen erfüllt sein müssen und OR, dass entweder die eine oder die andere erfüllt sein muss.
*/

SELECT speicherort, preis
FROM foto
WHERE thema="people" AND preis > 14;

SELECT name
FROM fotograf
WHERE wohnort="Hamburg" OR wohnort="Berlin";

/*
Wenn wir für Zahlen den Bereich einschränken wollen als von bis können wir den SQL Befehl BETWEEN nutzen.
Im Beispiel werden alle Fotos ausgegeben deren Preis größer als 40 und kleiner als 150 sind.
Wieder liesst es sich genau wie geschrieben:
select preis, speicherort from foto where preis between 40 and 150.
Zu deutsch: wähle Preis, Speicherort aus Foto wo Preis zwischen 40 und 150 [ist].
*/

SELECT preis, speicherort
FROM foto
WHERE preis BETWEEN 40 AND 150;

/*
Wenn wir Stringeinträge durchsuchen wollen bei der wir keine genaues Matching haben wollen, wie bei Marke und iPhone,
dann können wir so genannte Wildcards oder auch Platzhalter nutzen. 

Platzhalter 1, das Prozentzeichen %: Das Prozentzeichen matched jeden String egal wie lang er ist auch bei 0.
Also folgende Strings werden für %Pro gemachted: 14 Pro, 13 Pro, 11Pro, Pro und auch liuerfeöilrufgherlugzbqerlfhuPro

Platzhalter 2, der Unterstrich _: Der Unterstrich matched genau 1 Zeichen. Nicht 2 nicht 5 und auch nicht 0
Folgende Strings matchen M_ller: Müller, Möller, Miller ... Folgende matchen nicht: Mller, Mueller, Manueller...
*/

SELECT *
FROM kamera
WHERE marke="iPhone" 
AND model LIKE "%Pro";

SELECT *
FROM fotograf
WHERE name LIKE "Hans M_ller";

/*
 Wenn wir nur die Einträge zurück haben möchten, bei denen eine Spalte vorhanden ist dann können wir filtern mit
 WHERE <attribut> IS NOT NULL. Und eben wenn wir alle aben wollen, bei denen das Feld leer ist: WHERE <attribut IS NULL.
 
 MERKE: nach der Überprüfung klappt nicht das Gleichzeichen = und umgedreht können wir auch nicht schreiben 
 WHERE name IS "Hans"
*/

SELECT *
FROM kamera
WHERE marke IS NOT NULL;

/*
In unserem Beispiel haben wir weniger als 10 Einträge in der Tabelle. In einer echten Datenbank haben wir aber 
im Zweifel Tausende oder Millionen Einträge. Wenn wir als nur eine bestimmte ANzahl an Einträgen zurück haben 
wollen, können wir LIMIT gefolgt von der Anzahl benutzen. Unser Beispiel gibt uns also nur die ersten 3 EInträge
zurück.
*/

SELECT *
FROM foto
LIMIT 3;

/*
Die Reihenfolge der Einträge ist in der Regel die, in der sie gespeichert wurden. Wenn du die Reihenfolge in deiner
Rückgabe beeinflussen willst, dann kannst du ORDER BY und dem Attribut nach dem du sortieren möchtest nutzen.
Standardmäßig wird dann aufsteigend (ASC) sortiert. Für absteigend muss noch der Befehlr DESC mitgegeben werden.+

Natürlich könnt ihr ORDER BY und LIMIT miteinander kombinieren um bspw nur die 3 neusten Einträge zu erhalten.
Wichtig ist jedoch, dass erst ORDER BY und dann LIMIT genutzt wird.
*/
SELECT *
FROM foto
ORDER BY datum DESC;

SELECT *
FROM foto
ORDER BY datum desc
LIMIT 3;

/*
Wenn wir nur die Einträge aus einem Attribut und keine Duplikate möchten, dann können wir DISTINCT nutzen.
Wenn also SELECT marke uns zurückgibt: Canon, Olympus, Canon, Leica, Leica gibt uns SELECT DISTINCT marke:
Canon, Olympus, Leica.

Wir können auch mehrere Attribute mit Distinct kombinieren, dann werden die einzi´gartigen Kombination aus beiden
zurückkgeben.
*/

SELECT DISTINCT marke
FROM kamera;

SELECT DISTINCT marke, model
FROM kamera;

/*
AGGREGATION
SQL gibt uns auch die Möglichkeit Berechnungen auf unsere Daten anzuwenden. 
Hier ein paar Beispiele für Preis 12, 6, 5
*/

/*
AVG() berechnet uns den Durchschnitt aller Werte des angegebenen Attribut. 
Das Beispiel ergibt dann 7,666..
*/
SELECT AVG(preis)
from foto;

/*
MAX() gibt den größten Wert des Attributs
Für das Beispiel dann 12
*/
SELECT MAX(preis)
from foto;

/*
MIN() gibt den kleinsten Wert des Attributs
Für das Beispiel dann 5
*/
SELECT MIN(preis)
from foto;

/*
COUNT() gibt die Anzahl an Einträgen
Für unser Beispiel wäre das 3.
*/
SELECT COUNT(*)
FROM album;

/*
Mit GROUP BY können wir auch Berechnungen für einzelne Gruppen machen.
Das untere Beispiel listet uns die Anzahl an Kameras pro Marke auf
Canon   | 2
Leica   | 2
Sony    | 1
etc.
*/
SELECT marke, COUNT(*)
FROM kamera
GROUP BY marke;

/*
Wir können unsere Berechnung auch umbenenent mit AS. Das funktioniert übrigens auch für alle anderen
Spalten.

So können wir dann die Aggregation auch nach der größe sortieren.
*/

SELECT thema, COUNT(*) AS anzahl
FROM foto
GROUP BY thema
ORDER BY anzahl DESC;

/*
ADVANCED TOPIC: JOINS

In unserem Datenbank Design haben wir gestern die Relationen zwischen den Tabellen mit den Fremschlüsseln
in unserer foto Tabelle abgebildet. Wenn wir also ein Foto haben mit album_id 2 dann müssen wir in einer
seperaten Abfrage noch schauen, was ist denn der Name von dem Album mit der ID 2. SQL gibt uns die  Möglichkeit
beide Tabellen miteinander zu kombinieren. Dafür nutzen wir JOIN gefolgt mit der Tabelle, die wir kombinieren
möchten. Mithilfe von ON sagenw ir dann noch welcher unsere Attribute (Der Fremdschlüssel) soll denn mit 
dem Schlüssel in der anderen Tabelle verglichen werden
*/

SELECT *
FROM foto
JOIN album
ON album_id = album.id


/*
Wenn wir mehrere Fremdschlüssel haben, können wir auch mehrere Tabellen miteinander kombinieren.
Außerdem können wir weiterhin filtern und nur bestimmte Attribute auswählen.

Da wir aus mehreren Tabellen mehrere Attribute mit dem selben Namen haben können, müssen wir diese
genau bennennen mit einer ähnlichen Notation wie Javascript Objekte: tabellenname.attributname
*/
SELECT speicherort, kamera.marke, kamera.model, fotograf.name
FROM foto
JOIN kamera
ON kamera_id = kamera.id
JOIN fotograf
ON fotograf_id = fotograf.id
WHERE foto.id=5;