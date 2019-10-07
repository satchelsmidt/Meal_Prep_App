var express = require('express')

var db = require("../models")

module.exports = function(app){
    console.log("first plan api hit")
    app.post("/api/plans", function(req, res){
        db.Plan.create(req.body)
        console.log("req.body:", req.body)
        // .then(function(data){
        //     console.log("third plan api hit")
        //     // res.json(data)
        // })
    })
}