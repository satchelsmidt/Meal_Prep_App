//Route users to various html pages
var path = require('path')

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated.js");

module.exports = function (app) {
    
    //The root directory path of our application, which is linked to our home html page
    app.get("/", function (req, res) {

        if (req.user) {
            res.redirect("/home");
        }
        res.sendFile(path.join(__dirname, "../public/assets/html/login.html"))
    });

    //home page route
    app.get("/home", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/html/home.html"))
    })

    //signup route
    app.get("/signup", function (req, res) {
        if (req.user) {
            res.redirect("/home");
        }
        res.sendFile(path.join(__dirname, "../public/assets/html/signUp.html"))
    })

    //route to create a new plan
    app.get("/createPlan", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/html/createPlan.html"))
    });

    //route to view all previously created plans
    app.get("/plans", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/html/plans.html"))
    });

    //route for an individual plan (that has been created)
    app.get("/plans/:planId", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/html/finalPlan.html"))
    });
}