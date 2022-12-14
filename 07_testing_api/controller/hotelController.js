const hotels = [
    {
        id: 73947595,
        name: "Shanri-La",
        city: "Istanbul",
        ratings: [5, 5, 3]
    },{
        id: 73947596,
        name: "The Marker",
        city: "Dublin",
        ratings: [5, 4, 4]
    },{
        id: 73947597,
        name: "Four Seasons",
        city: "Bangkok",
        ratings: [5, 5, 5]
    },
]

export function getAll(req, res) {
    res.status(200).json(hotels)
}

export function getOne(req, res) {
    console.log(req.params.id)
}

export function editOne(req, res) {}

export function deleteOne(req, res) {}

export function saveOne(req, res) {}