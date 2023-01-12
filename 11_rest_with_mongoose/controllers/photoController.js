import * as Photo from "../models/Photo.js"
import { faker } from '@faker-js/faker';

/**
 * Für jede Router haben wir einen Controller
 * Jeder Controller ruft dann die Methode aus unserem Model auf, der den dazugehörigen
 * Datenbankzugriff macht.
 * Was bisher noch fehlt ist Error handling, falls unvollständige/fehlerhafte Daten übergeben
 * oder zurückgegeben werden.
 */

/**
 * Im Falle eines Fehlers, möchten wir mithilfe eines switches unterscheiden, was für ein Fehler 
 * aufgetreten ist. Tritt der Fehler auf unsere ID auf, dann wurde diese nicht gefunden oder im falschen
 * Format übergeben. Dafür nutzen wir den Fehlercode 404.
 * Für alle anderen Fehler, die unser Validator wirft, gehen wir von einer fehlerhaften Eingabe aus und
 * nutzen Fehlercode 400.
 */
const errorSwitch = (err) => {
    switch(err.path) {
        case "_id":
            err.statusCode = 404
            err.message = "ID nicht gefunden"
            break
        default:
            err.statusCode = 400
            err.message = "Überprüfe deine Eingabe"
    }
    return err
}

export const createPhoto = async (req, res, next) => {
    /**
     * Jeden Zugriff auf unser Model packen wir jetzt in ein try catch um etwaige Fehler
     * an unseren Error Handler zu senden
     */
    try {
        const result = await Photo.create(req.body)
        res.status(201).json(result)
    } catch(err) {
       next(errorSwitch(err))
    }
}

export const getAllPhotos = async (req, res, next) => {
    try {
        const result = await Photo.getAll()
        res.status(200).json(result)
    } catch (err) {
        next(errorSwitch(err))
    }
}

export const getPhoto = async (req, res, next) => {
    // falsche Id
    try {
        const result = await Photo.getOne(req.params.photoId)
        res.status(200).json(result)
    } catch(err) {
        next(errorSwitch(err))
    }
}

export const updatePhoto = async (req, res, next) => {
    //fehlerhafter Wert wird gespeichert
    //fehlerhafte Id

    if (Object.keys(req.body).length === 0) {
        res.status(204).send()
        return
    }

    try {
        const result = await Photo.updateOne(req.params.photoId, req.body)
        res.status(201).json(result)
    } catch (err) {
        next(errorSwitch(err))
    }
}

export const replacePhoto = async (req, res, next) => {
    try {
        const result = await Photo.replaceOne(req.params.photoId, req.body)
        res.status(201).json(result)
    } catch (err) {
        next(errorSwitch(err))
    }
}

export const deletePhoto = async (req, res, next) => {
    try {
        await Photo.deleteOne(req.params.photoId)
        res.status(204).send()
    } catch (err) {
        next(errorSwitch(err))
    }
}

/**
 * Da es häufig mühsam ist für unsere Datenbank Daten einzugeben, können wir das Paket Faker nutzen,
 * das uns zufällige aber verlässliche Daten erzeugt. Schaut euch am besten mal die Doku von Faker an
 * welche Daten ihr alle erstellen könnt: https://fakerjs.dev/api/
 */

export const createFake = async (req, res) => {
    
    const data = {
        price: faker.commerce.price(),
        url: faker.image.imageUrl(1234, 2345, undefined, true),
        date: faker.date.past(),
        theme: faker.word.noun(),
    }
    
    const result = await Photo.create(data)
    res.status(201).json(result)
}