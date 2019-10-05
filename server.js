//setup server structure for app
var express = require('express');
var session = require('express-session');

var passport = require("./config/passport.js")

var db = require("./models")

var PORT = process.env.PORT || 4343;
var app = express();

//setup middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//setup pub directory
app.use(express.static("public"));

//use sessions to keep track of users login status
app.use(session({ secret: "keyboard cat?", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

//AREA WHERE WE REQUIRE VARIOUS ROUTE FUNCTIONS

//TODO: input the various route functions

require("./routes/user-api-routes.js")(app)
require("./routes/html-routes.js")(app)

//Sync up database via sequelize before loading page
db.sequelize.sync().then(function(){
    app.listen(PORT,function(){
        console.log("App running at http://localhost:" + PORT)
    })
})

