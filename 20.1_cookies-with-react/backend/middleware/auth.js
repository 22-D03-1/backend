import { verifyToken } from "../lib/token.js"

/**
 * Das ist die Middleware die den Zugriff auf unsere Home Seite reguliert
 * Wir lesen erst den Cookie aus dem Request Objekt. Dieser ist gespeichert unter dem Namen,
 * den wir ihm gegeben haben
 * Dann Nutzen wir unsere Funktion um den Token aus dem Cookie zu überprüfen. Ist diese erfolgreich 
 * sagen wir mit next(), dass er weiter in der Route forfahren kann. Falls nicht leiten wir ihn
 * auf die login Seite weiter.
 * BEACHTE das redirect machen wir, da unser Backend auch das Frontend ausgibt. Mit react würde es 
 * reichen 401 zurück zugeben und ie weiterleitung im Frontend zu übernehmen.
 */
export const authorize = (req, res, next) => {
    const token = req.cookies.loggedIn

    try {
        const verifiedUser = verifyToken(token)
        next()
    } catch (err) {
        res.status(401).redirect("/login")
    }
}

/**
 * LoggedIn macht das umgekehrte wie authorize, ist der nutzer eingeloggt leiten wir ihn weiter.
 * Auch hier würde in React das Frontend diese überprüfung übernehmen
 */
export const loggedIn = (req, res, next) => {
    const token = req.cookies.loggedIn

    try {
        const verifiedUser = verifyToken(token)
        res.redirect("/")
    } catch (err) {
        next()
    }
}