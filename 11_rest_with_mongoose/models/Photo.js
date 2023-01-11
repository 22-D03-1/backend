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