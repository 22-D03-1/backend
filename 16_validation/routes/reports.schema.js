// In dieser Datei beschreiben wir die Struktur der Request Bodies.
// Wir können mit Ajv - ähnlich wie in Mongoose Models - Schemas definieren.
// Die Form ist hier natürlich etwas anders, erfüllt aber den gleichen Zweck.
// Für jeden Endpoint richten wir ein eigenes Schema ein.

export const postSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        author: { type: "string" },
    },
    required: ["title"],
    additionalProperties: false,
};

// Da wir bei GET und DELETE keinen Body haben,
// können wir in der Validierung festlegen, dass dort nichts stehen darf.
// Durch die express.json() Middleware ist req.body immer ein Object.
// Somit können wir den type auf "object" setzen.
// Fügen wir jetzt noch die Property additionalProperties: false ein,
// Darf nichts in req.body übermittelt werden.
export const getSchema = {
    type: "object",
    additionalProperties: false,
};

export const deleteSchema = {
    type: "object",
    additionalProperties: false,
};
