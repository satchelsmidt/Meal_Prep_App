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

    // //External API call here
    // app.post("/api/external", function (req, res){
    //     let queryURL = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + cuisines + "&diet=" + diets + "&intolerances=" + intolerances + "&number=5&addRecipeInformation=true&apiKey=10fd6276ba57493797da32beaf541d00"
    // })
    
};