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

    

    //////////////////CLEARED////////////////////

    //This API call searches for the plan corresponding to the page the user is on (in the url), and returns plan info + linked recipe info
    app.get("/api/final_plan/:planId", function (req, res) {
        db.Plan.findOne({
            where: { id: req.params.planId },
            include: [{ model: db.Recipe }]
        }).then(function (dbPlan) {
            console.log("db PLAN:", dbPlan)

            //declare an empty array to hold our returned recipes
            const recipeArr = []

            //Loop through each recipe in the recipe array (tied to the plan searched)
            for (let i = 0; i < dbPlan.Recipes.length; i++) {
                var recipeData = dbPlan.Recipes[i]
                // push recipe data to our recipe array
                recipeArr.push(recipeData)
            }
            res.json(recipeArr)
        })
    });
};