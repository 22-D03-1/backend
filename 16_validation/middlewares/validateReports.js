// Nach der Überprüfung im Controller, haben wir uns entschieden,
// die Validierung auszulagern und eigene Middlewares daraus zu machen.
// Diese Middlewares prüfen nun wie die Lösung im Controller den req.body.
// Hier haben wir jetzt aber alles übersichtlicher gebündelt
// und können die Middlewares im Router vor den Controllers einbinden.

export const validatePost = (req, res, next) => {
    if (!req.body.email || !req.body.username) {
        return res.status(400).json("please provide email and username");
    }
    // email und username sind gegeben

    if (!req.body.email.length > 0) {
        return res.status(400).json("email address is required");
    }
    // email ist länger als 0 Zeichen lang

    if (!req.body.email.includes("@")) {
        return res.status(400).json("email must contain @");
    }
    // email enthält ein @-Zeichen

    if (!req.body.username.length > 0) {
        return res.status(400).json("username is required");
    }
    // username ist länger als 0 Zeichen lang

    next();
}

export const validatePut = () => { }
export const validateDelete = () => { }
