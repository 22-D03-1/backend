// Task 1
// =================
// ## Courses
// GET         /courses            200
// GET         /courses/:id        200
// POST        /courses            201
// PUT         /courses/:id        204
// DELETE      /courses/:id        204
app.get("/courses", (req, res) => {
    res.status(200).json();
});
app.get("/courses/:id", (req, res) => {
    res.status(200).json();
});
app.post("/courses", (req, res) => {
    res.status(201).json();
});
app.put("/courses/:id", (req, res) => {
    res.status(204).end();
});
app.delete("/courses/:id", (req, res) => {
    res.status(204).end();
});

// ## Participants
// GET         /participants       200
// GET         /participants/:id   200
// POST        /participants       201
// PUT         /participants/:id   204
// DELETE      /participants/:id   204
app.get("/participants", (req, res) => {
    res.status(200).json();
});
app.get("/participants/:id", (req, res) => {
    res.status(200).json();
});
app.post("/participants", (req, res) => {
    res.status(201).json();
});
app.put("/participants/:id", (req, res) => {
    res.status(204).end();
});
app.delete("/participants/:id", (req, res) => {
    res.status(204).end();
});

// ## Modules
// GET         /modules            200
// GET         /modules/:id        200
// POST        /modules            201
// PUT         /modules/:id        204
// DELETE      /modules/:id        204
app.get("/modules", (req, res) => {
    res.status(200).json();
});
app.get("/modules/:id", (req, res) => {
    res.status(200).json();
});
app.post("/modules", (req, res) => {
    res.status(201).json();
});
app.put("/modules/:id", (req, res) => {
    res.status(204).end();
});
app.delete("/modules/:id", (req, res) => {
    res.status(204).end();
});
