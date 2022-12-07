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

const db = new Low(new JSONFile("db/data.json"))


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
     * Deswegen vor dem Vergleich Number(req.params.id) oder +req.params.id
     * um sie in eine Zahl umzuwandeln
     */
    const value = db.data.albums.find(a => a.id === +req.params.id)
    res.json(value)
}

export const editAlbum = async (req, res) => {
    await db.read()

    /**
     * Die Array Funktion findIndex funktioniert wie find nur, dass nicht das
     * Objekt zurück gegeben wird sondern wo es sich befindet.
     * So können wir es im Array austauschen
     */
    const index = db.data.albums.findIndex(a => a.id === +req.params.id)

    //Kudos an Rahman für den Vorschlag den doppelten spread Operator zu benutzen
    db.data.albums[index] = { ...db.data.albums[index], ...req.body }

    //Wenn wir unsere lowdb ändern, müssen wir db.write ausführen
    await db.write()

    res.send(`${req.params.id} updated`);

}

export const deleteAlbum = async (req, res) => {
    await db.read()
    const index = db.data.albums.findIndex(a => a.id === +req.params.id)

    // Wie PUT nur, das wir mithilfe des Index mit splice das Element aus dem array löschen
    db.data.albums.splice(index, 1)

    db.write()

    res.send(`${req.params.id} deleted`)

}

export const saveAlbum = async (req, res) => {
    await db.read()

    /**
     * Wir nutzen map um alle ids zu finden, dann mit Math.max
     * den größten Wert zu ermitteln. Dieser +1 ist dann unser 
     * Index für das neue ELement
     */
    const nextId = Math.max(...db.data.albums.map(a => a.id)) + 1
    
    db.data.albums.push({id: nextId, ...req.body})

    db.write()

    res.send(`${nextId}`)
}