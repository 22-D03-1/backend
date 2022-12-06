const products = [
    {
        id: 1,
        name: "A",
        categories: ["x", "y"],
    },
    {
        id: 2,
        name: "B",
        categories: ["y"],
    },
    {
        id: 3,
        name: "C",
        categories: ["x"],
    },
    {
        id: 4,
        name: "D",
        categories: ["y", "z"],
    },
]

// Task 2
// =================
// ## Products
// GET         /products                200
// GET         /products?category=      200
// GET         /products/:id            200
app.get("/products", (req, res) => {
    const category = req.query.category;

    if (category) {
        const filteredProducts = products.filter(product => product.categories.includes(category));
        return res.json(filteredProducts);
    }

    res.json(products);
});

// ## Users
// GET         /users            200
// GET         /users/:id        200
// POST        /users            201
// PUT         /users/:id        204
// DELETE      /users/:id        204
app.get("/users/:id", (req, res) => {
    res.status(200).json();
});
app.post("/users", (req, res) => {
    res.status(201).json();
});
app.put("/users/:id", (req, res) => {
    res.status(204).end();
});
app.delete("/users/:id", (req, res) => {
    res.status(204).end();
});

// ## Orders
// GET         /orders            200
// GET         /orders/:id        200
// POST        /orders            201
// PUT         /orders/:id        204
// DELETE      /orders/:id        204
app.get("/orders", (req, res) => {
    res.status(200).json();
});
app.get("/orders/:id", (req, res) => {
    res.status(200).json();
});
app.post("/orders", (req, res) => {
    res.status(201).json();
});
app.put("/orders/:id", (req, res) => {
    res.status(204).end();
});
app.delete("/orders/:id", (req, res) => {
    res.status(204).end();
});
