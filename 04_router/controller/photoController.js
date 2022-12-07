import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const db = new Low(new JSONFile("data/db.json"))

export const getAllPhotos = async (req, res) => {
    await db.read()
    res.json(db.data.photos)
}

export const getPhoto = async (req, res) => {
    await db.read()
    const value = db.data.photos.find(a => a.id === +req.params.id)
    res.json(value)
}

export const editPhoto = async (req, res) => {
    await db.read()

    const index = db.data.photos.findIndex(a => a.id === +req.params.id)

    db.data.photos[index] = { ...db.data.photos[index], ...req.body }

    await db.write()

    res.send(`${req.params.id} updated`);
}

export const deletePhoto = async (req, res) => {
    await db.read()
    const index = db.data.photos.findIndex(a => a.id === +req.params.id)

    db.data.photos.splice(index, 1)

    db.write()

    res.send(`${req.params.id} deleted`)
}

export const savePhoto = async (req, res) => {
    await db.read()

    const nextId = Math.max(...db.data.photos.map(a => a.id)) + 1
    
    db.data.photos.push({id: nextId, ...req.body})

    db.write()

    res.send(`${nextId}`)
}