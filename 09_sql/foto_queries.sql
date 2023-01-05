/*
Die meiste Power entwickelt SQL bei der Abfrage von Daten also dem R unseres CRUD. 
Das funktioniert deutlich besser als bei MongoDB, weswegen SQL fast ausschliesslich für Data Warehouses
genutzt wird um Datenanalysen zu machen. 
*/

SELECT * 
FROM album;

SELECT name, id 
FROM album;

/*
*/
SELECT name
FROM album 
WHERE id=1;

/*
||
&&
*/

SELECT speicherort, preis
FROM foto
WHERE thema="people" AND preis > 14;

SELECT name
FROM fotograf
WHERE wohnort="Hamburg" OR wohnort="Berlin";

SELECT preis, speicherort
FROM foto
WHERE preis BETWEEN 40 AND 150;

/*
Wildcard
*/

SELECT *
FROM kamera
WHERE marke="iPhone" 
AND model LIKE "%Pro";

SELECT *
FROM fotograf
WHERE name LIKE "Hans M_ller";

SELECT *
FROM kamera
WHERE marke IS NOT NULL;

SELECT *
FROM foto
LIMIT 3;

/*
aufsteigend - ASC Was standardmäßig genutzt wird
absteigend - DESC
*/
SELECT *
FROM foto
ORDER BY datum DESC;

SELECT *
FROM foto
ORDER BY datum desc
LIMIT 3;


SELECT *
FROM album
ORDER BY beschreibung;

SELECT DISTINCT marke
FROM kamera;

SELECT DISTINCT marke, model
FROM kamera;

/*
Aggregationen
*/

SELECT AVG(preis)
from foto;

SELECT MAX(preis)
from foto;

SELECT MIN(preis)
from foto;

SELECT COUNT(*)
FROM album;

SELECT marke, COUNT(*)
FROM kamera
GROUP BY marke;

SELECT thema, COUNT(*) AS anzahl
FROM foto
GROUP BY thema
ORDER BY anzahl DESC;

/*
JOINS
*/

SELECT *
FROM foto
JOIN album
ON album_id = album.id

SELECT speicherort, kamera.marke, kamera.model, fotograf.name
FROM foto
JOIN kamera
ON kamera_id = kamera.id
JOIN fotograf
ON fotograf_id = fotograf.id
WHERE foto.id=5;