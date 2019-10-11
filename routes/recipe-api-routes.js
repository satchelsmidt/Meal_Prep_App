//Import/require express setup vars
// var express = require('express');

var db = require("../models")

module.exports = function (app) {

    app.get("/api/recipes", function (req, res) {
        // let plan_id = req.body.id
        db.Recipe.findAll(req.body)
            //add plan id to req.body
            .then(function (data) {
                res.json(data)
            });
    });

    app.get("/api/recipes_desc", function (req, res) {
        // let plan_id = req.body.id
        db.Recipe.findAll(
            {
                order: [
                    ['id', 'DESC']
                ],
                limit: 1

            }).then(function (data) {
                console.log("should be recipe max id) ; ", res.json(data))
                res.json(data)
            });
    });

    app.get("/api/final_plan", function (req, res) {
        // let plan_id = req.body.id
        db.Recipe.findAll(
            { include: [{ model: db.recipe_plans }],
            //query should basically be, return recipe data for all recipes that have a recipe id associated with the highest plan is via the recipe_plans table
            attributes:[[db.recipe_plans.PlanId === (db.sequelize.fn('max', db.sequelize.col('PlanId')))]]  

            }
            ).then(function (data) {
                console.log("should be recipes associated with max plan id?: ", res.json(data))
                res.json(data)
            });
    });


    /////////////////////DONT USE THIS////////////////////////

    app.get("/api/current_plan", function (req, res) {

        var query = {};
        if (req.query.UserId) {
          query.UserId = req.query.UserId;
        }

        //TODO: modify this query to be able to return all plans tied to CURRENT user id
        //right now, returns max plan id (which will always be the one just created, which is fine for create plan purposes but not long term)
        db.Plan.findAll(
            // req.body, 
            {where: query,
                include: [db.User],
            // attributes: [
            //     Sequelize.fn('MAX', Sequelize.col('id'))
            //  ],
            order:[
                ['id', 'DESC']
            ], 
            limit: 1
            // include: [
            //     { model: db.User }
            // ]
        }).then(function (data) {
            console.log("CURRENT PLAN? : ", data)
            res.json(data);
        })
    })


    /////////////////////DONT USE THIS////////////////////////


    app.post("/api/recipes", function (req, res) {
        // let plan_id = req.body.id
        db.Recipe.create(req.body)
            //add plan id to req.body
            .then(function (data) {
                //need to create object to pass to .plan.create() 
                // var idAssociations = {
                //     recipe_id: data.id,
                //     plan_id: req.body.id
                // }
                // db.Plan.create(idAssociations)
                // .then(function(){
                //     res.json(idAssociations)
                // })

                //within .then, this button should create a record in your plans table
                res.json(data)
            });
    });
};

/////////IDEA OF STEPS///////////////
//0. user makes selections on 'cuisine 'and 'diet' forms that determines parameters for external AJAX call (create.html)

//1.a. Make AJAX call "GET" (create.html) and display returned recipe options to user on next page (plan.html)? same page(create.html)? 
// Note: This AJAX call does not touch the database, nothing is stored, all on the front end
//1.b After user chooses recipes (clicks 'create plan' on one of html pages listed above), make another AJAX call (on that page) that POSTS the selected recipe ID NUMBERS only (?) 
    //export this to plan_controller.js
    //example (tentative) below

    // var selectedRecipes = require("../public/assets/js/createPlan.js/index.js")

//2. Within plan_controller.js, POST ID from those selected recipes to the database and store it in a way that makes sense (via this page)
    //2.a. store recipe info (JUST ID??), tie to plan created, tie to user who created plan

    //example below
    // router.post("/api/recipes", function(req, res){
    //     selectedRecipes.addRecipes([
    //         "recipe_title"
    //     ])
    // });


//3. Create 'get' function on plan_controller.js that runs when user clicks 'create plan'
    //This function 'gets' the recipe ID from the linked plan + user that was just stored in our database
        //(uses sequelize linked with our plan_models file??? This is where the callbacks come into play)
    //Once ID is gotten, bring it to the front end on the finished plan page
    //This will return the corrrect recipe data and display it on the page in an aesthetically pleasing way

////////////////////////////////////////////////////////////////////