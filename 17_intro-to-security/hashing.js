import bcrypt from "bcrypt"

const db = []

const signUp = async ({username, password}) => {

    // saltRounds
    const saltRounds = 12
    /**
     * Die "Kosten" bzw Rechenleistung die notwendig ist den Hash zu generieren. Umso höher umso sicherer
     * 10 rounds: 10 hashes / sek
     * 11 rounds:  5 hashes / sek
     * 15 rounds: 3 sek / hash
     * 25 rounds: 1 Stunde / hash
     * 31 rounds: 3 Tage / hash
     * 
     * Industrietstabdard ist 10 bis hin zu 15 für sehr sicherheitskritische Anwendungen
     */
    // Salt generieren
    const salt = await bcrypt.genSalt(saltRounds)
    console.log("Salt: ", salt)
    // Passwort hashen
    const hashedSaltedPassword = await bcrypt.hash(password, salt)

    /**
     * Alternativ kann hash und salt auch in einer Zeile erstellt werden
     * Indem wir anstatt einem Salt als String eine Zahl (Number of rounds) übergben
     * 
     * const hashedSaltedPassword = await bcrypt.hash(password, 12)
     */

    console.log("Hashed Password: ", hashedSaltedPassword)
    // Nutzer in der Datenbank speichern
    db.push({username, password: hashedSaltedPassword})

    console.log("Datenbank: ", db)
}

const login = async ({username, password}) => {
    // Nutzer finden
    const user = db.find(user => user.username == username)

    // Falls Nutzer nicht verfügbar sende error
    if (!user) {
        console.error("Nutzer nicht gefunden")
        return
    }

    // Überprüfe eingegebenes Passwort mit Hash
    const passwordCorrect = await bcrypt.compare(password, user.password)

    // Falls richtig mache login
    if(passwordCorrect) {
        console.log("Login erfolgreich")
        return user
    } 
    // Falls falsch sende error
    else {
        console.error("Falsches Passwort")
        return
    }

    /**
     * Aus Sicherheitsgründen, würde man nicht unterschieden, in der Nachricht ob Nutzername oder
     * Password nicht korrekt ist sondern eine Nachricht senden:
     * "Nutzername oder Passwort nicht korrekt"
     * So kann man sicherstellen, dass man durch ausprobieren nicht mind. überprüfen kann ob der 
     * Nutzername im System hinterlegt ist
     */

}

const testUser = {
    username: "ferdi91",
    password: "JamesDean"
}
await signUp(testUser)

const newUser = {
    username: "Dr.Freud",
    password: "siggi"
}
await signUp(newUser)


const wrongUser = {
    username: "Dr.Freud1",
    password: "test1234"
}
await login(wrongUser)


/**
 * Brute Force
 * Hacking Methode um mit vielfachem Versuch auf das richtige Passwort zu kommen
 */

//Wir nutzen einen neuen unsicheren Nutzer an

const unsafeUser = {
    username: "tim",
    password: "1402"
}

await signUp(unsafeUser)

const performBruteForce = async () => {
    for (let i=0; i<9999; i++) {
        let pwd = i.toString()

        pwd = "0".repeat(4-pwd.length)+i

        if(i%100 == 0) {
            console.log("Prüfe Durchgang ", i)
        }

        const foundPassword = await login({username: "tim", password: pwd})

        if(foundPassword) {
            console.log("Gefunden! ", pwd)
            break
        }
    }
}

performBruteForce()