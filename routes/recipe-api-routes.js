//setup export to server file
module.exports = function (app) {

    //require our db model
    const db = require("../models")

    app.get("/api/recipes", function (req, res) {
        db.Recipe.findAll(req.body)
            .then(function (data) {
                res.json(data)
            });
    });

    app.get("/api/recipes_desc", function (req, res) {
        db.Recipe.findAll(
            {
                order: [
                    ['id', 'DESC']
                ],
                limit: 1

            }).then(function (data) {
                res.json(data)
            });
    });

    app.post("/api/recipes", function (req, res) {
        db.Recipe.create(req.body)
            .then(function (data) {
                res.json(data)
            });
    });
    
};