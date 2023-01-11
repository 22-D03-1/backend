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

export const create = async ({price, date, url, theme}) => {
    const newPhoto = new Photo({price, date, url, theme})

    const result = await newPhoto.save()
    return result
}

export const getAll = async () => {
    const photos = await Photo.find()
    return photos
}

export const getOne = async (photoId) => {
    //const photo = await Photo.findOne({_id: photoId})

    const photo = await Photo.findById(photoId)

    return photo
}
export const editOne = async (photoId, data) => {
    const photo = await Photo.findByIdAndUpdate(photoId, data, {new: true})

    return photo
}

export const deleteOne = async (photoId) => {
    const photo = await Photo.findByIdAndDelete(photoId)

    return photo
}