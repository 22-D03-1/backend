import mongoose from "mongoose"
import PhotographerModel from "./Photographer.js"

const schema = new mongoose.Schema({
    price: Number,
    date: Date,
    url: {
        type: String,
        validate: {
            validator: (v) =>{
                const val = v.startsWith("http") || v.startsWith("www")
                return val
            },
            message: "Bitte übergebe eine richtige URL"
        },
        required: true,
        //unique: true
    },
    theme: String,
    photographer: {
        type: mongoose.Schema.Types.ObjectId,
        /**
         * Wenn wir eine Referenz zu einem Anderen Modell erstellen, haben wir zwei Möglichkeiten:
         * 1. Wir geben den Namen an den wir beim Erstellen des Models vergeben
         * 2. Wir importieren das Model und verweisen darauf
         */
        ref: PhotographerModel
    },
    /**
     * Wenn wir eine Many to Many Relation abbilden wollen dann funktioniert das am besten, wenn wir
     * in beiden Modellen ein Array von Schlüsseln des anderen Modells speichern.
     * 
     * Ein Foto kann in mehreren Alben sein
     * Ein Album kann mehrere Fotos beinhalten
     * 
     * In Photos speichern wir also in einem Array die Ids aller Alben, in denen sich das Foto befinden kann
     * und in Alben speichern wir in einem Array die Ids aller Fotos, die sich in dem Foto befinden.
     * 
     * Das hat natürlich zur Folge, dass wenn ein Foto einem Album hinzugefügt wird, wir es an beiden stellen
     * Updaten müssen.
     * 
     * AUFGEPASST: Bei einer Many to Many Relation sollten wir als Referebt den Namen als String verwenden, 
     * da er sonst bei Seed Schwierigkeiten hat auf ein Modell zu verweisen was noch nicht erstellt wurde.
     */
    albums: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album"
    }]
})

//Modelname: "Photo" -> Collection: "photos"
const Photo = mongoose.model("Photo", schema)
export default Photo

export const create = async ({price, date, url, theme}) => {
    const newPhoto = new Photo({price, date, url, theme})
    const result = await newPhoto.save()
    return result

}

/**
         * Wir speichern in unserem Model nur die ID, des Objekts auf das wir verweisen.
         * Wenn wir dann ein normalen find() machen, dann bekommen wir auch nur die ID
         * Um auch die Informationen aus der anderen Collection möchten dann können wir
         * populate() benutzten also das "bevölkern" unserer Id. 
         * Dafür benötigen wir mindestens einen Parameter und zwar den Namen des Feldes in dem
         * wir die Id speichern. Dann bekommen wir aber auch alle darin abgespeicherten Infos.
         * 
         * Mit einem zweiten Parameter können wir dann noch begrenzen, welche der Felder wir möchten
         * Dafür nutzen wir einen String mit dem Namen der Felder mit Leerzeichen getrennt.
         * 
         * Die Id, die unter _id gespeichert wird, bekommen wir jedesmal, außer wir sagen explizit,
         * dass wir sie nicht möchten mit -_id
         */

export const getAll = async () => {

    const photos = await Photo
        .find()
        .populate("photographer", "-_id name email")
    return photos
}

/**
 * 
 * return result.map((el,i) => {    
        return {
            ...el._doc,
            count: i
        }
    })
 */

export const getFiltered = async (page, limit) => {
    let result

    result = await Photo.find({theme: "freak"})

    result = await Photo.where("theme").equals("freak")

    result = await Photo.find({price: {$gt: 900}})

    result = await Photo.find({price: {$lt: 100}})

    result = await Photo.find({price: {$lte: 97}})

    result = await Photo.where("price").gt(900)

    result = await Photo.find({price: {$gt: 300, $lt: 310}})

    result = await Photo.where("price").gt(300).lt(310)

    result = await Photo.where("theme").ne("rhubarb")

    result = await Photo.where("theme").in(["fisherman", "tennis"])

    result = await Photo.where("theme").regex(/^m.*/)

    result = await Photo.where("price").gt(900).limit(10)

    result = await Photo.where("price").gt(900).sort("price")

    result = await Photo.where("price").gt(900).sort({price: -1})

    result = await Photo.find().sort({price: -1}).limit(1)

    result = await Photo.find().sort({theme: -1})

    result = await Photo.find()
        .skip((page - 1) * limit)
        .limit(limit)

    const count = await Photo.count()

    return {
        currentPage: page,
        totalPages: count / limit,
        limit,
        result
    }
}

export const getOne = async (photoId) => {

    const photo = await Photo
        .findById(photoId)
        /**
         * Wenn wir mehrere Referenzen haben können wir auch mehrere populate benutzen um für jeden
         * Fremdschlüssel die dazugehörigen Daten aus der Collection  zu erhalten.
         */
        .populate("photographer")
        .populate("albums")
        /**
         * Wir können auch Entscheiden, welche Felder aus unserem Modell wir haben möchten.
         * Mit SQL sagen wir SELECT * um alle Felder zu bekommen. Mongoose gibt uns automatisch
         * mit find(), findbyId() etc alle Felder. Mit select() können wir dann sagen, welche genau wir
         * brauchen. Dafür nutzen wir dann einen String mit den Feldnamen per Leerzeichen getrennt und wie
         * bei populate können wir die Id ausschliessen mit -_id.
         */
        .select("-_id price date")

    return photo
}

export const updateOne = async (photoId, data) => {

    const photo = await Photo.findByIdAndUpdate(
        photoId, 
        data, {
            new: true,
            runValidators: true
        })

    return photo
}

export const replaceOne = async (photoId, data) => {
    const photo = await Photo.findOneAndReplace(
        {
            _id: photoId
        }, 
        data,
        {
            returnDocument: "after",
            runValidators: true
        })
    return photo
}

export const deleteOne = async (photoId) => {

    const photo = await Photo.findByIdAndDelete(photoId)

    return photo
}