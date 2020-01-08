//setup export to server file
module.exports = function (app) {

    //Require our db model
    const db = require("../models")


    app.post("/api/recipe_plans", function (req, res) {
        console.log("req.body: ", req.body)
        db.recipe_plans.create(req.body, {
        })
            .then(function (data) {
                res.json(data)
            })
    })

    //route to update plan that is in the process of being created
    app.put("/api/plans", function (req, res) {
        // console.log("Reached this point")
        // console.log('PAREMETERESSS: ', req)

        db.Plan.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (data) {
                console.log('did this work? ')
                res.json(data)
            })
    })


    //Cleared

    //API route hit on home.js when user clicks 'create plan'
    //Creates new plan tied to current user
    app.post("/api/plans", function (req, res) {
        db.Plan.create(req.body, {
        })
            .then(function (data) {
                res.json(data)
            });
    });

    //API route that returns all plans tied to current user
    app.get("/api/all_plans/:UserId", function (req, res) {
        db.Plan.findAll(
            {
                where: {
                    UserId: req.params.UserId
                }
            }).then(function (data) {
                res.json(data);
            })
    })

    //api route that returns most recent user plan (called on create.js page load, immediately after new plan is added to db)
    app.get("/api/current_plan/:UserId", function (req, res) {
        db.Plan.findAll(
            {
                where: {
                    UserId: req.params.UserId
                },
                order: [
                    ['id', 'DESC']
                ],
                limit: 1
            }).then(function (data) {
                res.json(data);
            })
    })

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