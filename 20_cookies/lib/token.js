import dotenv from "dotenv"
dotenv.config()

import jwt from "jsonwebtoken"

export const signToken = (payload) => {
    const token = jwt.sign(
        payload,
        process.env.TOKEN_SECRET)

    return token
}

export const verifyToken = (token) => {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET)
    return payload
}