console.log(process.argv);

console.log(process.argv.includes("doNotDelete"));
console.log("Count", process.argv[2] === "doNotDelete" ? undefined : +process.argv[2]);
