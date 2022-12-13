// Die erste Variante ist während des TDD entstanden.
// Die weiteren Versionen haben wir im Laufe des Refactorings entwickelt
// und konnten anhand der Tests sicherstellen, dass sie ebenfalls funktionieren.
// --------------------------------------------
// KISS
function fizzBuzz(number) {
    if (number % 3 === 0 && number % 5 === 0) return "fizzbuzz";
    if (number % 3 === 0) return "fizz";
    if (number % 5 === 0) return "buzz";
    return number;
}

// // --------------------------------------------
// // Divide & Conquer
// // Für diese Variante bitte die zusätzlichen Tests aktivieren!
// // Da wir eine weitere Funktion definieren, soll diese natürlich auch getestet werden.
// function divisibleBy(number, x) {
//     return number % x === 0;
// }
//
// function fizzBuzz(number) {
//     if (divisibleBy(number, 3) && divisibleBy(number, 5)) return "fizzbuzz";
//     if (divisibleBy(number, 3)) return "fizz";
//     if (divisibleBy(number, 5)) return "buzz";
//     return number;
// }
//
// // --------------------------------------------
// // DRY - Don't Repeat Yourself
// function fizzBuzz(number) {
//     const divisibleBy3 = number % 3 === 0;
//     const divisibleBy5 = number % 5 === 0;
//
//     if (divisibleBy3 && divisibleBy5) return "fizzbuzz";
//     if (divisibleBy3) return "fizz";
//     if (divisibleBy5) return "buzz";
//     return number;
// }
//
// // --------------------------------------------
// // DRY - Don't Repeat Yourself
// function fizzBuzz(number) {
//     let result = "";
//     if (number % 3 === 0) result += "fizz";
//     if (number % 5 === 0) result += "buzz";
//     return result !== "" ? result : number;
// }

module.exports = {
    fizzBuzz,
    // divisibleBy,
};
