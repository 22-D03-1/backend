// Setup ------------------
import Ajv from "ajv";
const ajv = new Ajv({ allErrors: true });

// Schema Definition ------------------
const schema = {
    type: "object",
    properties: {
        foo: { type: "integer" },
        bar: { type: "string" }
    },
    required: ["foo"],
    additionalProperties: false
}

const validate = ajv.compile(schema)

// Data Validation ------------------
const data = {
    foo: [1],
    bar: ["abc"]
}

const valid = validate(data)
if (!valid) console.log(validate.errors) // Error Handling
console.log(valid);
