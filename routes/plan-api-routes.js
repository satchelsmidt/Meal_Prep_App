// var express = require('express')

var db = require("../models")

module.exports = function (app) {

    app.get("/api/plans", function (req, res) {
        db.Plan.findAll(req.body, {
            // include: [
            //     { model: db.User }
            // ]
        }).then(function (data) {
            res.json(data);
        })
    })

    //api route to return current plan being worked on ()
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

 //api route to return all plans created by current user
 app.get("/api/all_plans/:UserId", function (req, res) {
    console.log("req.params back end:", req.params)
    // var query = {};
    // if (req.query.UserId) {
    //   query.UserId = req.query.UserId;
    // }
    //TODO: modify this query to be able to return all plans tied to CURRENT user id
    //right now, returns max plan id (which will always be the one just created, which is fine for create plan purposes but not long term)
    db.Plan.findAll(
        // req.body, 
        {where: {
            UserId: req.params.UserId
        }
        // include: [db.User],
    
    }).then(function (data) {
        console.log("all plans:", data)
        res.json(data);
    })
})

    app.post("/api/plans", function (req, res) {
        console.log(req.body)
        db.Plan.create(req.body, {
            // include: [
            //     {model: db.User}
            // ]
        })
            .then(function (data) {
                console.log("data returned from api/plans POST request")
                res.json(data)
            });
    });

    app.post("/api/recipe_plans", function(req,res){
        console.log("req.body: ", req.body)
        db.recipe_plans.create(req.body, {
        })
        .then(function(data){
            res.json(data)
        })
    })

};