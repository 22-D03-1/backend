import bcrypt from "bcrypt"

import { signToken } from "../lib/token.js"

import * as authModel from "../models/User.js"

export const register = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    try {
        const newUser = await authModel.create({
            email: req.body.email, 
            password: hashedPassword
        })

        res.status(201).json({
            email: newUser.email,
            id: newUser._id
        })

    } catch (err) {
        err.statusCode = 400
        return next(err)
    }
}

export const login = async (req, res, next) => {

    console.log(req.cookies)
    // schauen ob nutzer existiert
    try {
        const user = await authModel.getOne({email: req.body.email})

        if(!user) {
            const err = new Error("Login nicht erfolgreich")
            err.statusCode = 400
            throw err
        }
        // überprpüfen des passworts
        const passwordIsEqual = await bcrypt.compare(req.body.password, user.password)
        // response senden
        if(passwordIsEqual) {
            //token erstellen
            const token = signToken({id: user._id})
            //token einem cookie hinzufügen
            //res.cookie("bezeichnung", "inhalt", "optionen")
            const expDate = 1000 * 60 * 60 * 24
            res.cookie("loggedIn", token, {
                sameSite: "None",
                secure: true,
                maxAge: expDate,
                httpOnly: false
            })
            //cookie per response zurückschicken
            res.json({message: "Erfolgreich eingeloggt", id: user._id})
        } else {
            const err = new Error("Login nicht erfolgreich")
            err.statusCode = 400
            throw err
        }
    } catch (err) {
        return next(err)
    }
}

export const googleCallback = async (request, accessToken, refreshToken, profile, done) => {
    const user = await authModel.findOrCreate(profile)
    
    if(user) {
        done(null, user)
    }
  }