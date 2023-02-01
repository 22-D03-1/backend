import {Schema, model} from "mongoose"

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    provider: String
})

const userModel = model("User", userSchema)

export const create = async (data) => {
    const result = await userModel.create(data)

    return result
}

export const getOne = async (filter) => {
    const result = await userModel.findOne(filter)
    return result
}

export const findOrCreate = async (data) => {
    const result = await userModel.findOneAndUpdate(
        {email: data.email}, 
        {provider: data.provider},
        {upsert: true})
    
    return result
}