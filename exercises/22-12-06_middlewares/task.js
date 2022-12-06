import express from "express";
const app = express();

app.listen(4321, () => console.log("listening on port 4321"));

const participants = [
    {
        id: 1,
        firstName: "Shannah",
        lastName: "Curton",
        email: "scurton0@weather.com",
        age: 46,
    }, {
        id: 2,
        firstName: "Arvie",
        lastName: "Stading",
        email: "astading1@drupal.org",
        age: 39,
    }, {
        id: 3,
        firstName: "Cassandry",
        lastName: "Parcells",
        email: "cparcells2@foxnews.com",
        age: 23,
    }
];
let lastID = 3;

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// ## Participants
// GET         /participants       200
// GET         /participants/:id   200
// POST        /participants       201
// PUT         /participants/:id   204
// DELETE      /participants/:id   204
app.get("/participants", (req, res) => {
    res.status(200).json(participants);
});
app.get("/participants/:id", (req, res) => {
    res.status(200).json();
});
// app.post("/participants", (req, res) => {
//     if (+req.body.age >= 18) {
//         lastID++;
//         participants.push({
//             ...req.body,
//             id: lastID,
//         });
//         res.status(201).json();
//     } else {
//         res.status(400).json("too young");
//     }
// });

// app.post("/participants", (req, res) => {
//     if (+req.body.age < 18) return res.status(400).json("too young");

//     lastID++;
//     participants.push({
//         ...req.body,
//         id: lastID,
//     });
//     res.status(201).json();
// });

app.post("/participants", (req, res, next) => {
    if (+req.body.age < 18) return res.status(400).json("too young");
    next();
});

app.post("/participants", (req, res) => {
    lastID++;
    participants.push({
        ...req.body,
        id: lastID,
    });
    res.status(201).json();
});

app.put("/participants/:id", (req, res) => {
    res.status(204).end();
});
app.delete("/participants/:id", (req, res) => {
    res.status(204).end();
});

app.use((req, res) => {
    res.status(404).end();
});
