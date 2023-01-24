// Setup ------------------
import Ajv from "ajv";
const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });

// Wir können verschiedene Formate über ein Zusatzmodul prüfen.
// So ist es bspw. möglich, eine E-Mail-Adresse oder URL zu validieren.
import addFormats from "ajv-formats";
addFormats(ajv);



// Schema Definition ------------------
// Wenn wir Unterobjekte validieren wollen,
// können wir sie wie das "Hauptobjekt" beschreiben
// und an der entsprechenden Stelle einfügen.
// Entweder legen wir separate Variablen an (wie hier gezeigt),
// oder wir setzen die Definitionen an der entsprechenden Stelle direkt ein.
const address = {
    type: "object",
    additionalProperties: false,
    properties: {
        street: { type: "string" },
        number: { type: "string" },
        zipCode: { type: "string" },
        city: { type: "string" },
    }
};

const author = {
    type: "object",
    required: ["firstName"],
    additionalProperties: false,
    properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: {
            type: "string",
            // Mit ajv-formats lässt sich über "format" das Format prüfen.
            format: "email",
        },

        address,
    },
};

const schema = {
    type: "object",
    required: ["title", "author"],
    additionalProperties: false,
    properties: {
        title: { type: "string" },
        description: { type: "string" },

        author,

        reference: {
            type: "string",
            minLength: 24,
            maxLength: 24,
        },

        // Haben wir es mit Arrays zu tun,
        // setzen wir den type auf "array" und nutzen "items",
        // um die einzelnen Elemente im Array zu definieren.
        // Wir können dabei jede Form von Typen verwenden, auch "object" (mit den "properties").
        keywords: {
            type: "array",
            // Wollen wir mehrere Datentypen akzeptieren,
            // setzen wir type auf ein Array mit allen validen Datentypen.
            // Das funktioniert überall, nicht nur im type "array".
            items: { type: ["string", "number"] },
        },
    },
};

const validate = ajv.compile(schema)

// Data Validation ------------------
const body = {
    title: "My first report",
    description: "Lorem ipsum dolor sit amet",
    keywords: ["lorem", "ipsum", "platzhalter", 123],
    author: {
        firstName: "Dominik",
        email: "test@test.de",
        address: {
            street: "Musterstr.",
            number: "123",
            zipCode: "12345",
            city: "Musterstadt",
        },
    },
    reference: "63cfa064ac2e5e3f1494b5d4",
};

const valid = validate(body)
if (!valid) console.log(validate.errors) // Error Handling
console.log(valid);
