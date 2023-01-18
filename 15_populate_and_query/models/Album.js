import mongoose from "mongoose"

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    photos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Photo"
    }]
})

const Album = mongoose.model("Album", schema)

export default Album