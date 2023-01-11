import mongoose from "mongoose"

/**
 * Obwohl uns MongoDB alle Freiheiten gibt wie wir unsere Daten speichern können,
 * können wir mit Mongoose trotzdem eine Gewisse Struktur geben. Dafür erstellen 
 * wir ein Schema, dass sagt, welche Informationen wollen wir speichern, welchen
 * Datentyp benötigen wir etc. Mit mongoose wird aus einer NoSQL Datenbank ein wenig
 * eine SQL Datenbank.
 * 
 * Shorthand: Wenn wir nur den Datentyp angeben, dann können wir anstatt price: {type: Number}
 * auch einfach nur price: Number schreiben
 */
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
    /**
     * Der Rückgabetyp von find() ist ein Array
     */
    const photos = await Photo.find()
    return photos
}

export const getOne = async (photoId) => {
    /**
     * Analog zu find() gibt es auch die Funktion findOne(), die uns nur ein einzigen Eintrag zurück gibt.
     * So bekommen wir anstatt einem Array ein Objekt
     * wenn wir nichts in die Klammern schreiben, dann bekommen wir den ersten Eintrag in der Liste.
     * Deswegen übergeben wir ein Objekt in das wir schreiben wonach wir filtern wollen. Dazu morgen mehr
     * Wenn wir also nur einen bestimmten Eintrag möchten, dann identifizieren wir ihn über seine ID
     * wir sagen also findOne({_id: <id-nach-der-wir-suchen>}).
     * 
     * Mongoose hat für den spezifischen Fall von findOne und filter nach Id die Methode findById(), der wir die
     * ID ohne Objekt übergeben können.
     */
    //const photo = await Photo.findOne({_id: photoId})

    const photo = await Photo.findById(photoId)

    return photo
}

export const editOne = async (photoId, data) => {
    /**
     * findById kann direkt weiterverwendet werden um einen Eintrag zuändern. Dafür wird das
     * Objekt erst mit der gefunden und dann geändert: finde mit id und ändere -> find by id and update
     * Dafür übergeben wir erst die id, dann ein Objekt mit allem was wir ändern wollen.
     * Optional können wir noch Optionen geben. Eine davon ist new. Wenn wir new auf true setzen wird der
     * geänderte Eintrag zurück gegeben. Ansonsten ist der false und der EIntrag vor Änderung wird zurück gegeben
     * Ob ihr den neuen oder das alten EIntrag möchtet kommt ganz darauf an, was ihr mit den Daten machen wollt.
     */
    const photo = await Photo.findByIdAndUpdate(photoId, data, {new: true})

    return photo
}

export const deleteOne = async (photoId) => {
    /**
     * Wie findByIdAndUpdate gibt es auch findByIdAndDelete zum löschen.
     * Hier müssen wir aber nur die ID von dem Eintrag übergeben, den wir löschen möchten
     */
    const photo = await Photo.findByIdAndDelete(photoId)

    return photo
}