//Route users to various html pages
var path = require('path')

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated.js");

module.exports = function (app) {
    //The root directory path of our application, which is linked to our home html page
    app.get("/", function (req, res) {

        if(req.user){
            res.redirect("/home");
        }

        res.sendFile(path.join(__dirname, "../public/assets/html/signUp.html"))
    });

    app.get("/home", isAuthenticated, function(req, res){
        res.sendFile(path.join(__dirname, "../public/assets/html/home.html"))
    })

    app.get("/login", function(req, res){
        if(req.user){
            res.redirect("/home");
        }
        res.sendFile(path.join(__dirname, "../public/assets/html/login.html"))
    })

    app.get("/createPlan", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/html/createPlan.html"))
    });

    app.get("/finalPlan", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/html/finalPlan.html"))
    });

    app.get("/plans", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/html/plans.html"))
    });
}