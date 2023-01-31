import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

function signToken(payload) {
    const token = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRESIN,
            algorithm: "HS512",
        });

    return token;
}

function verifyToken(token) {
    const verifiedPayload = jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        { algorithms: ["HS512"] },
    );
    return verifiedPayload;
}

export default {
    signToken,
    verifyToken,
};
