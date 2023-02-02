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

    // schauen ob nutzer existiert
    try {
        const user = await authModel.getOne({email: req.body.email})

        if(!user) {
            const err = new Error("Login nicht erfolgreich")
            err.statusCode = 400
            throw err
        }
        // überprüfen des passworts
        const passwordIsEqual = await bcrypt.compare(req.body.password, user.password)
        // response senden
        if(passwordIsEqual) {
            /**
             * Sobald wir überprüft haben, dass der Nutzer in der Datenbank vorhanden ist, können wir einen
             * Token erstellen und diesen per cookie an unsere Response anhängen.
             * Dafür sagen wir vor unserem send() oder json() 
             * res.cookie(). Cookie bekommt dann drei Parameter: den Namen des cookies um ihn zu identifizieren, 
             * den Wert den wir speichern möchten(unseren Token) und Optionen. Bei den Optionen sind drei Sachen wichtig:
             * 
             * sameSite: Damit können wir einstellen ob bei Anfragen von andern Seiten die Cookies mit geschickt
             * werden sollen. Default wird der Wert "lax" (zu deutsch fahrlässig danke Leo ;-) ) eingestellt. Damit lassen
             * sich cookies über Anfragen per link oder get zu. Alternativ gibt es "None" also bei jeglichen Anfragen (sehr unsicher)
             * und "strict" also bei keinen Anfragen (sehr sicher)
             * 
             * maxAge: gibt die Zeit wie lange das Cookie gültig ist an. Für sicherheitskritische Seiten wie Banking ist hier
             * eine sehr kurze Zeit angemessen (5 minuten) bei Social Media Seiten wird in der regel eine sehr lange Zeit 
             * eingestellt (2 Jahre).
             * 
             * httpOnly: ist ein weiterer Sicherheitsmechanismus, der sicherstellt, dass der cookie nur über http Anfragen genutzt wird
             * und nicht über Javascript ausgelesen werden kann
             */

            const token = signToken({id: user._id})
            //token einem cookie hinzufügen
            const expDate = 1000 * 60 * 60 * 24
            res.cookie("loggedIn", token, {
                sameSite: "lax",
                maxAge: expDate,
                httpOnly: true
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

/**
 * Wenn wir den Nutzer ausloggen wollen, dann müssen wir lediglich mit clearCookie den Cookie 
 * entfernen. Dann ist dieser nicht mehr im Browser vorhanden udn wird in den request auch nicht
 * mehr mitgeschickt.
 */

export const logout = async(req, res) => {
    res.clearCookie("loggedIn")
    res.status(200).redirect("/login")
}

export const googleCallback = async (request, accessToken, refreshToken, profile, done) => {
    const user = await authModel.findOrCreate(profile)
    
    if(user) {
        done(null, user)
    }
  }