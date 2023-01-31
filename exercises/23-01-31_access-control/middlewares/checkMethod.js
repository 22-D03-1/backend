function checkMethod(req, res, next) {
    if (!["GET", "POST", "DELETE"].includes(req.method)) {
        return res.status(405).end();
    }
    next();
}

export default checkMethod;
