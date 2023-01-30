import dotenv from "dotenv";
dotenv.config();

// JSON Web Tokens sind eine Art Ausweis, die wir unseren angemeldeten Clients ausstellen können.
// Diese nutzen dann den Ausweis, um in Anfragen zu beweisen, dass sie angemeldet sind.
// Der Ausweis - in unserem Fall der Token - enthält zusätzliche Informationen (Payload) über den Client.
// Der Server muss hierfür nichts gespeichert halten, anders als bei Sessions:
// Dort benötigen wir eine Liste mit den Sessions auf dem Server!
// Damit der Token nicht manipuliert werden kann, benötigen wir Sicherheitsmerkmale,
// wie wir es von Geldscheinen, Ausweisen, Tickets,... kennen.
// JWT enthalten sogenannte Signaturen - Das sind Hashes, die durch einen geheimen Schlüssel (Secret), welchen nur der Aussteller (Issuer) kennt, generiert werden.
// Die Signaturen setzen sich aus der Payload und dem Secret zusammen.
// Wird die Payload manipuliert, passt die Signatur nicht mehr und der Token kann als ungültig erkannt werden.
import jwt from "jsonwebtoken";


// Signieren des Tokens (Ausstellen eines Tokens)
function signToken(payload) {
    // Zum Signieren verwenden wir die Methode sign() des Moduls jsonwebtoken.
    // Wir übergeben die gewünschte Payload, das Secret, welches wir in der .env speichern,
    // und zusätzliche Optionen, wie den Algorithmus zum Signieren und die Gültigkeitsdauer des JWT.
    const token = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRESIN,
            algorithm: "HS512",
        });

    // Es kommt ein Token als String heraus, der aus drei Abschnitten besteht, die durch einen Punkt getrennt sind:
    // header.payload.signature
    // Die Abschnitte sind in base64 kodiert und können ebenso einfach dekodiert/ausgelesen werden.
    return token;
}

// Verifizieren des Tokens (Überprüfung auf Gültigkeit)
function verifyToken(token) {
    try {
        // Beim Verifizieren nutzen wir verify().
        // Wir müssen den Token und das gleiche Secret wie beim Signieren übergeben.
        // Heraus kommt die Payload, oder es wird ein Fehler geworfen.
        // Mögliche Fehler sind bzw. eine ungültige Signatur oder ein abgelaufener Token.
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified);
    } catch (error) {
        console.error(error.message);
    }
}


const payload = {
    userId: 2,
    name: "Dominik",
};

const token = signToken(payload);
console.log(token);

setTimeout(() => verifyToken(token), 2000);
