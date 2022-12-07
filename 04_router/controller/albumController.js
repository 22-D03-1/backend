import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const db = new Low(new JSONFile("db/data.json"))


export const getAllAlbums = async (req, res) => {
    await db.read()
    res.json(db.data.albums)
}

export const getAlbum = async (req, res) => {
    await db.read()
    const value = db.data.albums.find(a => a.id === +req.params.id)
    res.json(value)
}

export const editAlbum = async (req, res) => {
    await db.read()

    const index = db.data.albums.findIndex(a => a.id === +req.params.id)

    //Kudos Rahman für den Vorschlag den doppelten spread Operator zu benutzen
    db.data.albums[index] = { ...db.data.albums[index], ...req.body }

    await db.write()

    res.send(`${req.params.id} updated`);

}

export const deleteAlbum = async (req, res) => {
    await db.read()
    const index = db.data.albums.findIndex(a => a.id === +req.params.id)

    db.data.albums.splice(index, 1)

    db.write()

    res.send(`${req.params.id} deleted`)

}

export const saveAlbum = async (req, res) => {
    await db.read()

    const nextId = Math.max(...db.data.albums.map(a => a.id)) + 1
    
    db.data.albums.push({id: nextId, ...req.body})

    db.write()

    res.send(`${nextId}`)
}