import server from "../main.js"
import request from "supertest"

/**
 * Während unserer Entwicklung, ist unsere test.js Datei die erste Anlaufstelle.
 * Wir überlegen uns erst, was soll unsere können und definieren anschließend
 * den dazugehörigen Test. Bspw wollen wir nach einem erfolgreichen POST wir den 
 * Statuscode 201 zurück bekommen möchten. Also testen wir ebendas.
 * Wenn der Test geschrieben ist, sollten wir einen Timeout zurück bekommen,
 * da die Route noch nicht definiert ist. Wir bauen dann in unserem Controller nur das,
 * dass unser Test erfolgreich ist.
 */

describe("Hotel Routes Test", ()=>{
    /**
     * Wir können beliebig viele describe ineinader verschachteln. Hier erstellen wir mit
     * describe erst eine Gruppe für alle Hotel Routen, dann erstellen wir mit describe eine
     * weitere Gruppe für alle Tests für die spezifische Route. So ist bei Ausführen des
     * Tests übersichtlicher welche Tests erfolgreich und welche nicht waren.
     */
    describe("Get All Route", ()=>{
        let response = {}
        
        /**
         * Innerhalb unserer Gruppe können wir mit der beforeAll Methode Code ausführen, der vor
         * dem Laufen der Tests ausgeführt wird. Bspw der Request muss für jeden Test gemacht werden.
         * Also führen wir ihn vor allen Tests aus und können in jedem Test auf die response zugreifen.
         * Aufgepasst: Wenn sich die response ändert bpsw. Wenn wir testen wollen, was passiert wenn wir
         * einen falschen Parameter übergeben, müssen wir diesen doch innerhalb des Tests ausführen.
         */
        beforeAll(async ()=> {
            /**
             * Zum ausführen unserer Request nutzen wir das Paket supertest. Supertest funktioniert ähnlich
             * wie fetch mit dem Unterschied, dass unser Backend parallel nicht laufen muss. Dafür übergeben
             * wir unser server Objekt aus der main.js und können dann mit .get(), .post() etc. unsere
             * Requests machen.
             */
            response = await request(server).get("/hotels/?api_key=040")
        })
        /**
         * Ein Standardtest für eine Route: Bekomme ich den richtigen Statuscode zurück
         * Reminder: 200 für erfolgreichen GET; 201 für erfolgreichen POST; 202 für erfolreichen PUT;
         * 404 wenn nichts gefunden wird usw...
         */

        //Unsere Route gibt Statuscode 200 zurück
        test("return 200", () => {
            expect(response.statusCode).toBe(200)
        })

        /**
         * Wir können alles mögliche Testen wie hier bspw ob wir ein JSON erhalten. Hier ist die Balnce wichtig:
         * Nicht zu wenige Tests damit wir alles wichtige probieren, nicht zu viele und der Test zu langsam und
         * unübersichtlich wird
         */

        //Unsere Route gibt ein JSON zurück
        test("return JSON", () => {
            expect(response.type).toBe("application/json")
        })

        //Unsere Rückgabe hat Inhalt
        test("return body with content", () => {
            expect(typeof(response.body)).toBe("object")
            expect(response.body.length).toBeGreaterThan(0)
        })
    })

    //Wenn eine unbekannte Route aufgerufen wird soll 404 zurück gegeben werden
    test("unknown route return 404", async () => {
        const response = await request(server).get("/erliuzfgherilufhlewri?api_key=040")
        expect(response.statusCode).toBe(404)
    })

    //Wenn kein oder ein falscher API Key übermittelt wird soll 401 zurück gegeben werden
    test("wrong API key return 401", async () => {
        const response = await request(server).get("/?api_key=egitarre")
        expect(response.statusCode).toBe(401)
    })
})