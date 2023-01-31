import token from "../lib/token.js";

function checkToken(req, res, next) {
    try {
        token.verifyToken(req.body.token);
        next();
    } catch (error) {
        console.error(error);
        res.status(401).end();
    }
}

export default checkToken;
