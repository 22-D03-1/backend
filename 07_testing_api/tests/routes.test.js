import server from "../main.js"
import request from "supertest"

/**
 * Supertest
 */

describe("Hotel Routes Test", ()=>{
    describe("Get All Route", ()=>{
        let response = {}
        
        /** */
        beforeAll(async ()=>{
            response = await request(server).get("/hotels/?api_key=040")
        })
        //Unsere Route gibt Statuscode 200 zurück
        test("return 200", () => {
            expect(response.statusCode).toBe(200)
        })

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