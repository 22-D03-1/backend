/**
 * Hier befindet sich jetzt unsere Logik. In einer "vollen" MVC Architektur
 * würde der Controller auch kein Data Handling betreiben, sondern das würde 
 * über die Model passieren. Dazu mehr, wenn wir zu mongoose kommen.
 */

/**
 * Wir nutzen lowdb, um aus unserer JSON eine Datenbank zu erstellen.
 * Dafür müsssen wir Low und JSONFile aus dem Paket importieren und 
 * können dann eine neue Datenbank Instanz initialiseren
 */
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const db = new Low(new JSONFile("data/db.json"))


export const getAllAlbums = async (req, res) => {
    // Wie bei einer "echten" Datenbank, müssen wir asynchron unsere Daten anfordern
    await db.read()

    //unter db.data finden wir sie dann
    res.json(db.data.albums)
}

export const getAlbum = async (req, res) => {
    await db.read()

    /**
     * Die Array Funktion find hilft uns basierend auf unseres Parameter ein Objekt
     * in unserem Array zu finden
     * BEACHTE: Parameter sind vom Format String und unsere ids sind Integer.
     * Deswegen wird vor dem Vergleich Number(req.params.id) oder +req.params.id
     * um den Parameter in eine Zahl umzuwandeln
     */
    const value = db.data.albums.find(a => a.id === +req.params.id)

    if(!value) {
        res.status(404).send("Not found")
        return
    }

    /**
     * Während des Live Codings kam der Fehler: "Unexpected end of JSON input"
     * Diesen haben wir gefixed bekommen indem wir der response explizit gesagt haben,
     * dass sie vom Typ JSON ist mit
     * res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        });
     * Interessanterweise bestand das Probelm nach dem Neustarten des Servers nicht mehr ^^
     * Manchmal bleibt es einfach schwarze Magie...
     */

    res.json(value)
}

export const editAlbum = async (req, res, next) => {
    await db.read()

    /**
     * Die Array Funktion findIndex funktioniert wie find() nur, dass nicht das
     * Objekt zurück gegeben wird sondern wo es sich im Array befindet.
     * So können wir es im Array austauschen
     */
    const index = db.data.albums.findIndex(a => a.id === +req.params.id)

    /**
     * In Zeile 38 und hier gehen wir mit dem Fall um, dass wir kein Objekt mit
     * der übergebenen ID gefunden haben. Wir können entweder direkt 404 als 
     * response senden oder wir können den 404 Handler, den wir als Middleware in 
     * main.js definiert haben nutzen. Dafür nutzen wir next() um zur nächsten
     * Middleware zu springen.
     * Vorteile: 
     *      - Weniger redundanten Code
     *      - bessere Lesbarkeit
     * Nachteile: 
     *      - der 404 handler muss direkt im Anschluss kommen, wenn wir vermeiden wollen,
     *        das andere Middleware auch getriggert wird
     *      - weniger Möglichkeiten individuelle Fehler Handling zu betreiben
     */
    if(index < 0) {
        return next()
    }

    //Kudos an Rahman für den Vorschlag den doppelten spread Operator zu benutzen
    db.data.albums[index] = { ...db.data.albums[index], ...req.body }

    //Wenn wir unsere lowdb ändern, müssen wir db.write ausführen um in die JSON zu schreiben
    await db.write()

    res.send(`${req.params.id} updated`);

}

export const deleteAlbum = async (req, res) => {
    await db.read()
    const index = db.data.albums.findIndex(a => a.id === +req.params.id)

    if(index < 0) {
        res.status(404).send("Not found")
        return
    }

    // Wie PUT nur, das wir mithilfe des Index mit splice das Element aus dem array löschen
    db.data.albums.splice(index, 1)

    db.write()

    res.send(`${req.params.id} deleted`)

}

export const saveAlbum = async (req, res) => {
    await db.read()

    /**
     * Wir nutzen map() und Math.max um aus allen den größten Wert zu ermitteln. 
     * Dieser +1 ist dann unser Index für das neue ELement.
     */
    const nextId = Math.max(...db.data.albums.map(a => a.id)) + 1
    
    db.data.albums.push({id: nextId, ...req.body})

    db.write()

    res.send(`${nextId}`)
}