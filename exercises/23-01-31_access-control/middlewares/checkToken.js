import token from "../lib/token.js";

function checkToken(req, res, next) {
    try {
        const payload = token.verifyToken(req.body.token);
        console.log(payload.role);
        req.user = payload;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).end();
    }
}

export default checkToken;
