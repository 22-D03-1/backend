import mongoose from "mongoose"

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: {
            /**
             * Regex kann super scary aussehen und nicht sehr intuitiv sein zu lesen ist aber
             * die beste Option um eine Stringvalidierung durchzuführen.
             * Ihr müsst nicht 100 Prozent verstehen wie ein Regex aufgebaut ist. Sucht im Internet
             * bspw. bei Stackoverflow (oder ChatGPT ;-)) nach einem Regex und nutzt Tools wie
             * Regex101.com um dieses zu testen.
             */
            validator: (v) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
            message: "Please enter a valid email address"
        }
    },
    password: String,
    address:{
        street: String,
        houseNumber: {
            type: String,
            validate: {
                validator: (v) => /^[0-9].*$/.test(v),
                message: "Please insert some kind of number as House number"
            }
        },
        zipCode: String,
        city: String,
        country: {
            type: String,
            /**
             * Eine weite Out-of-the-box Valididierung von Mongoose ist enum.
             * Damit können wir mögliche Werte für das Feld festlegen.
             * In unserem Beispiel können unter country nur die Länder gespeichert werden, die wir
             * unten angegeben haben. Wenn wir bpsw USA probieren, würde uns mongoose ein Fehler werfen.
             */
            enum: ["Deutschland", "Moldawien", "Iran", "Syrien", "Venezuela"]
        }
    },
})

const Photographer = mongoose.model("Photographer", schema)

export default Photographer


export const getAll = () => {
    const all = Photographer
        .find()
        .select("name email")

    return all
}