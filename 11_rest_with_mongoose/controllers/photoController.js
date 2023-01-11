import * as Photo from "../models/Photo.js"
import { faker } from '@faker-js/faker';


export const createPhoto = async (req, res) => {
    const result = await Photo.create(req.body)
    res.status(201).json(result)
}

export const getAllPhotos = async (req, res) => {
    const result = await Photo.getAll()
    res.status(200).json(result)
}

export const getPhoto = async (req, res) => {
    const result = await Photo.getOne(req.params.photoId)
    if (!result) {
        res.status(404).send("nicht da digga")
        return
    } 
    res.status(200).json(result)
}

export const editPhoto = async (req, res) => {
    const result = await Photo.editOne(req.params.photoId, req.body)
    
    if (!result) {
        res.status(404).send("nicht da digga")
        return
    } 
    
    res.status(201).json(result)
}

export const deletePhoto = async (req, res) => {
    const result = await Photo.deleteOne(req.params.photoId)
    console.log(result)
    if (!result) {
        res.status(404).send("nicht da digga")
        return
    }

    res.status(204).send("Erfolgreich gelöscht")
}

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