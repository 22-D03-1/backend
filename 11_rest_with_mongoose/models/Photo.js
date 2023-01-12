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
        validate: {
            /**
             * Mongoose gibt uns die Möglichkeit eingegebene Daten zu validieren, bevor wir sie
             * in MongoDB speichern. Dafür müssen wir dem Feld ein validate attribut geben.
             * Innherlab von validate haben wir den validator, das ist eine Funktion, die das zu speichernde
             * Feld empfängt und einen boolean zurück gibt. True wenn alles passt, False falls nicht.
             * Wir checken also, ob unsere URL entweder mit http oder www beginnt. 
             * Um noch bessere validierung zu machen, sollten wir Regex nutzen.
             * Außerdem hat validate noch die Möglichkeit eine Nachricht zu verfassen, falls der validator
             * false zurück gibt
             */
            validator: (v) =>{
                const val = v.startsWith("http") || v.startsWith("www")
                return val
            },
            message: "Bitte übergebe eine richtige URL"
        },
        required: true,
        unique: true
    },
    theme: String
})

//Model: Photo -> Collection: photos
const Photo = mongoose.model("Photo", schema)

export const create = async ({price, date, url, theme}) => {
    // Erforderliche Daten nicht übergeben haben
    // Falscher Datentyp
    // Duplikat
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

export const updateOne = async (photoId, data) => {
    /**
     * findById kann direkt weiterverwendet werden um einen Eintrag zuändern. Dafür wird das
     * Objekt erst mit der gefunden und dann geändert: finde mit id und ändere -> find by id and update
     * Dafür übergeben wir erst die id, dann ein Objekt mit allem was wir ändern wollen.
     * Optional können wir noch Optionen geben. Eine davon ist new. Wenn wir new auf true setzen wird der
     * geänderte Eintrag zurück gegeben. Ansonsten ist der false und der EIntrag vor Änderung wird zurück gegeben
     * Ob ihr den neuen oder das alten EIntrag möchtet kommt ganz darauf an, was ihr mit den Daten machen wollt.
     */
    const photo = await Photo.findByIdAndUpdate(
        photoId, 
        data, {
            new: true,
            /** Die Validatoren unseres Schema (unique, required und unsere erstellten) wendet mongoose nur 
             * beim Erstellen an. Wenn wir möchten, dass auch bei updates und replaces die Eingabe überprüft wird,
             * müssen wir in den Optionen runValidators auf true setzen.
             * */
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
            //returnDocument: "after" hat den selben Effekt wie new: true. Ich schätze legacy code, dass zwei verschiedene genutzt werden
            returnDocument: "after",
            runValidators: true
        })
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