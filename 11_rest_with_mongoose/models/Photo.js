import mongoose from "mongoose"

const schema = new mongoose.Schema({
    price: Number,
    date: Date,
    url: {
        type: String,
        required: true,
        unique: true
    },
    theme: String
})

//Model: Photo -> Collection: photos
const Photo = mongoose.model("Photo", schema)

export const create = async () => {}
export const getAll = async () => {}
export const getOne = async () => {}
export const editOne = async () => {}
export const deleteOne = async () => {}