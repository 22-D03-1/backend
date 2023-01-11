import * as Photo from "../models/Photo.js"

export const getAllPhotos = async (req, res) => {
    const result = await Photo.getAll()
    res.status(200).send()
}

export const getPhoto = async (req, res) => {
    const result = await Photo.getOne()
    res.status(200).send()
}

export const createPhoto = async (req, res) => {
    const result = await Photo.create()
    res.status(201).send()
}

export const editPhoto = async (req, res) => {
    const result = await Photo.editOne()
    res.status(201).send()
}

export const deletePhoto = async (req, res) => {
    const result = await Photo.deleteOne()
    res.status(200).send()
}