/*
Eine neue Tabelle erstellt man mit CREATE TABLE gefolgt von dem Namen, den man der Tabelle geben möchte. 
Hier ist es good practise diesen klein zu schreiben.
im Anschluss schreibt man innerhalb der runden Klammern die Attribute der Tabelle.
Jedes Attribut hat einen Namen und einen Datentyp.
Es gibt eine Reihe verschiedener Datentypen hier die wichtigsten:
	- INT: Eine Zahl ohne Nachkommastellen
    - DECIMAL: Eine Zahl mit Nachkommastellen
    - CHAR: Eine Art String, den ihr auch eine bestimmte Länge limitieren köönt um Speicherplatz zu sparen
    - TEXT: Ein String, der (fast) beliebig lang sein kann
    - DATE: Ein Datum im Format YYYY-MM-DD
    - DATETIME: Datum und Zeit im Format YYYY-MM-DD HH:Mi:SS
Achtet darauf, dass ihr innherlab der Klammern an das Komma nach dem Attribut denkt (wie bei einem Array)
und am Ende eures Statements an das Semikolon
*/
CREATE TABLE album (
  /*
  Im Gegensatz zu MongoDB müssen wir explizit der Tabelle eine ID geben. Diese ist in der Regel ein INTEGER
  Dann müssen wir angeben, dass es unser Schlüssel ist, also wir die Teile darüber identifizieren können mit PRIMARY KEY
  Außerdem können wir mit AUTO_INCREMENT definieren, dass wenn wir nicht sagen was die ID ist es automatisch 1 hochgezählt wird-
  */
  id INT primary key auto_increment,
  /* Innerhalb der Klammern können wir angeben, auf welche Zeichenanzahl wir die Spalte limitieren */
  name char(50),
  datum date,
  beschreibung text
);
CREATE TABLE fotograf (
  id int primary key auto_increment,
  wohnort char(200),
  name char(50)
);
CREATE TABLE kamera (
  id int primary key auto_increment,
  marke char(50),
  model char(50),
  objektiv char(50)
);
CREATE TABLE foto (
  id int primary key auto_increment,
  thema char(50),
  speicherort char(255),
  datum date,
  /* Innerhalb der Klammern gebt ihr erst an, wie lang eure Dezimalzahl sein soll und dann wie viel Nachkommastellen sie hat  */
  preis decimal(6,2),
  /*
  In unserem relationalem Datenbank Design haben wir zwischen den Fotos und den anderen Tabellen eine 1:n Beziehung definiert.
  Um diese in SQL abzubilden speichern wir den Fremdschlüssel der 1 Tabelle (Ein Foto kann nur einen Fotograf haben) 
  in der n Tabelle (Ein Fotograf kann mehrere Fotos schiessen).
  Wir geben dann ein neues Attribut mit Datentyo an, idR tabellenname_schlüssel, gefolt von REFERNCES um zu sagen, dieser Wert verweist auf
  eine andere Tabelle mit dem Tabellennamen und dem Schlüssel
  */
  album_id int references album(id),
  fotograf_id int references fotograf(id),
  kamera_id int references kamera(id)
);


/*
Wenn wir einen neuen Eintrag in die Tabelle machen möchten, dann machen wir das mit INSERT INTO und dem Tabellennamen.
Dann haben wir zwei Möglichkeiten. 

1. Entweder wir geben nach dem Tabellennamen nicht die Attribute an. Dann müssen wir 
mit VALUES und den Werten in der Klammer genau die Reihenfolge und alle Attribute angeben.
*/
INSERT INTO album VALUES (1, "landschaft", "2022-11-14", "Schöne Landschaftsaufnamen");
INSERT INTO album VALUES (2, "portraits", "2022-12-05", "Ich fotografiewre gerne Menschen in New York City");

/*
2. Wir geben nach dem Tabellenname die Attribute an für die wir Werte speichern wollen. Dann können wir flexibel entscheiden  
für welche Attribute und in welcher Reihenfolge wir Werte angeben.
*/
INSERT INTO fotograf (wohnort, name) VALUES ("New York City", "Max Mustermann");
INSERT INTO fotograf (wohnort, name) VALUES ("Hamburg", "Hans Müller");

INSERT INTO kamera (marke, model, objektiv) VALUES ("Canon", "60D", "8mm ƒ/3.5");
INSERT INTO kamera (marke, model, objektiv) VALUES ("Fuji", "XT3", "18mm-55mm ƒ/2.8-4.0");
INSERT INTO kamera (marke, model, objektiv) VALUES ("iPhone", "14 Pro", "24 mm ƒ/1.78");

INSERT INTO foto (preis, datum, speicherort, thema, album_id, fotograf_id, kamera_id) VALUES (15.95, "2022-10-04", "https://images.unsplash.com/photo-1672795241394-cb9e2fa0573e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80", "architecture", 1, 2, 1);
INSERT INTO foto (preis, datum, speicherort, thema, album_id, fotograf_id, kamera_id) VALUES (22.95, "2022-07-14", "https://images.unsplash.com/photo-1672774336976-d1729220afa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=692&q=80", "people", 2, 2, 2);
INSERT INTO foto (preis, datum, speicherort, thema, album_id, fotograf_id, kamera_id) VALUES (6.95, "2023-01-01", "https://images.unsplash.com/photo-1671725501835-afb7bd1f21ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80", "people", 2, 1, 3);
INSERT INTO foto (preis, datum, speicherort, thema, album_id, fotograf_id, kamera_id) VALUES (40.25, "2022-09-22", "https://images.unsplash.com/photo-1672782654189-d1a8ff5ff417?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80", "ocean", 1, 1, 1);