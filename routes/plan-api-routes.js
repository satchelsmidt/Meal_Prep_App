//setup export to server file
module.exports = function (app) {

    //Require our db model
    const db = require("../models")

    let planId = 'placeholder'

    //TODO: create API route to return plan based on id, build a unique link for each plan using this
    app.post("/api/plans/" + planId, function (req, res) {
        console.log(req.body)
        db.Plan.findOne(req.body, {
            where: {}
        })
            .then(function (data) {
                console.log("data returned from api/plans POST request")
                res.json(data)
            });
    });

    app.post("/api/recipe_plans", function (req, res) {
        console.log("req.body: ", req.body)
        db.recipe_plans.create(req.body, {
        })
            .then(function (data) {
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
};