import Ajv from "ajv";
const ajv = new Ajv({ allErrors: true });

const validate = (schema) => {
    const test = ajv.compile(schema);

    return (req, res, next) => {
        const valid = test(req.body);
        if (!valid) return res.status(400).json(test.errors);

        next();
    };
}

export default validate;
