const { fizzBuzz, divisibleBy } = require("./index");

// Um unseren Code zu testen, verwenden wir eine Test Suite, in diesem Fall ist es Jest.
// Mit Jest sind wir in der Lage, Testfälle zu beschreiben, die dann überprüft werden.

// --------
// In diesem Beispiel sind wir nach dem Prinzip Test Driven Development (TDD) vorgegangen:

// Wir haben zuerst einen Testfall definiert, der natürlich fehlschlägt.
// Erst danach haben wir nur so viel Code geschrieben, dass der Test durchläuft.

// Wir achten stets darauf, dass wir nicht mehr als nötig schreiben.
// So stellen wir sicher, dass wir keinen fehlerhaften Code produzieren, oder später Code haben,
// der nicht weiter getestet wurde.

// Nachdem ein Testfall und der passende Code geschrieben sind,
// können wir noch einmal über den Code schauen und ihn optimieren.
// Diesen Schritt nennen wir Refactoring, weil wir hier lediglich den Code optimieren,
// das Ergebnis der Funktion aber gleich bleiben muss.
// Prüfen lässt sich das stets mit den Tests.

// TDD wird also grob in drei Phasen eingeteilt, die sich im Kreislauf wiederholen:
// Testing -> Coding -> Refactoring
// Oft findet man auch die Beschreibung "Red-Green-Refactor", die nach den Testergebnissen benannt ist.
// Erst schreibt man Tests, die fehlschlagen (Red),
// dann sorgt man mit dem Code dafür, dass sie durchlaufen (Green)
// und zum Schluss optimiert man seinen Code (Refactor).
// --------

// Mit describe() können wir unsere Tests gruppieren.
// Das macht immer dann Sinn, wenn wir Teilabschnitte von einander trennen wollen,
// oder mehrere Funktionen in einer Testdatei prüfen - so wie hier.
describe("fizzBuzz", () => {
    // Um einen Testfall zu erstellen, rufen wir die Funktion test() auf
    // und übergeben einen Namen für den Testfall.
    // Der Name des Test sollte beschreiben, was wir erwarten.
    test("ist eine Funktion", () => {
        // Die Erwartung prüfen wir dann mit expect() in Kombination mit weiteren Methoden.
        // In diesem Fall prüfen wir mit .toBeInstanceOf, ob fizzBuzz eine Funktion ist.
        expect(fizzBuzz).toBeInstanceOf(Function);
    });

    test("gibt eine Zahl zurück", () => {
        const result = fizzBuzz(2);
        // In diesem Fall schauen wir nach, ob das Ergebnis aus dem Funktionsaufruf vom Typ Number ist.
        expect(typeof result).toBe("number");
    });

    test("gibt die übergebene Zahl zurück", () => {
        // Wir können in einem Testfall auch mehrere Erwartungen prüfen.
        // Hier können wir mit den zwei Erwartungen sicherstellen,
        // dass wir mit unterschiedlichen Argumenten auch unterschiedliche Ergebnisse bekommen.
        expect(fizzBuzz(2)).toBe(2);
        expect(fizzBuzz(7)).toBe(7);
    });

    // Unsere Testfälle beschreiben die Anforderungen, die wir an die Funktion haben.
    // Für jede Anforderung sollte es mindestens einen Test geben,
    // da die Tests später als Beweis dienen sollen, dass unsere Funktion alle Anforderungen erfüllt.
    test("gibt 'fizz' zurück, wenn Zahl durch 3 teilbar", () => {
        expect(fizzBuzz(3)).toBe("fizz");
        expect(fizzBuzz(6)).toBe("fizz");
    });

    test("gibt 'buzz' zurück, wenn Zahl durch 5 teilbar", () => {
        expect(fizzBuzz(5)).toBe("buzz");
        expect(fizzBuzz(10)).toBe("buzz");
    });

    test("gibt 'fizzbuzz' zurück, wenn Zahl durch 3 und 5 teilbar", () => {
        expect(fizzBuzz(15)).toBe("fizzbuzz");
        expect(fizzBuzz(30)).toBe("fizzbuzz");
    });
});


// describe("divisibleBy", () => {
//     test("ist eine Funktion", () => {
//         expect(divisibleBy).toBeInstanceOf(Function);
//     });

//     test("gibt einen Boolean zurück", () => {
//         expect(typeof divisibleBy()).toBe("boolean");
//     });

//     test("gibt true zurück, wenn Zahl durch x teilbar", () => {
//         expect(divisibleBy(12, 3)).toBe(true);
//         expect(divisibleBy(20, 5)).toBe(true);
//     });
// });
