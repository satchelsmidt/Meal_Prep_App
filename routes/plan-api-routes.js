// var express = require('express')

var db = require("../models")

module.exports = function(app){

    app.get("/api/plans", function(req, res) {
        db.Plans.findAll(req.body, {include: [
                {model: db.User}
            ]}).then(function(data) {
            res.json(data);
        })
    })

    app.post("/api/plans", function(req, res){
        console.log(req.body)
        db.Plan.create(req.body, {
            // include: [
            //     {model: db.User}
            // ]
        })
        .then(function(data){
            console.log("data returned from api/plans POST request")
            res.json(data)
        });
    });
};