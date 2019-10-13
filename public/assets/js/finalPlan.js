var recipeTitle
var recipeLink
var recipeTime
var recipeServings
var ingredients

var finalRecipeDiv

var planStart = localStorage.getItem("planStart")
var planEnd = localStorage.getItem("planEnd")

var dateArray = localStorage.getItem("dateArray")
var actualDateArray = dateArray.split(',')

var dayArray = localStorage.getItem("dayArray")
var actualDayArray = dayArray.split(',')

var timeStartArray = localStorage.getItem("timeStartArray")
var actualTimeStartArray = timeStartArray.split(',')

var timeEndArray = localStorage.getItem("timeEndArray")
var actualTimeEndArray = timeEndArray.split(',')

console.log("string of dates:", dateArray)
console.log("string of days:", dayArray)
console.log("string of time ONEs:", timeStartArray)
console.log("string of time TWOs:", timeEndArray)

$("document").ready(function () {

    console.log("CLICKED A BUTTON")

    $.get("/api/final_plan").then(function (data) {
        console.log("Data: ", data)

        //Append header for final plan
        $("#finalPlanDiv").append($("<h1>Your Meal Plan:</h1>"))
        $("#finalPlanDiv").append($("<br>"))

        //Loop through all recipes in final plan and display data for each
        for (let i = 0; i < data.length; i++) {
            console.log("recipe:", data[i])

            finalRecipeDiv = $("<div>")
            finalRecipeDiv.attr("class", "finalRecipe")

            recipeTitle = data[i].recipe_title
            console.log("TITLE: ", recipeTitle)
            var title = $("<h3>").text(recipeTitle)
            finalRecipeDiv.append(title)

            recipeLink = data[i].recipe_link
            console.log("LINK: ", recipeLink)
            var link = $("<a target='_blank' href='" + recipeLink + "'>" + "Recipe Link" + "</a>")
            finalRecipeDiv.append(link)

            recipeTime = data[i].recipe_time
            console.log("COOK TIME: ", recipeTime)
            var time = $("<p>").append("Cook Time: ", recipeTime, " minutes")
            finalRecipeDiv.append(time)

            recipeServings = data[i].recipe_servings
            console.log("SERVINGS: ", recipeServings)
            var servings = $("<p>").append("Servings: ", recipeServings, " servings")
            finalRecipeDiv.append(servings)

            $("#finalPlanDiv").append(finalRecipeDiv)
            $("#finalPlanDiv").append($("<br>"))

            var ingredients = data[i].recipe_ingredients
            var ingredientsSplit = ingredients.split(',')

            console.log("array of separate ingredients:", ingredientsSplit)

            for (let k = 0; k < ingredientsSplit.length; k++) {
                var ingredient = $("<li>" + ingredientsSplit[k] + "</li>")
                $("#ingredientsList").append(ingredient)
            }
        }
        //Create/add to shopping list for user
        $("#shoppingList").prepend($("<h1>Ingredients:</h1>"))
    });
})

// var calendar

document.addEventListener('DOMContentLoaded', function () {

    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['interaction', 'dayGrid', 'timeGrid'],
        defaultView: 'timeGrid',
        visibleRange: {
            start: planStart,
            end: planEnd
        },
        // header: {
        //     left: 'prev,next today',
        //     center: 'title',
        //     right: 'dayGridMonth,timeGridWeek,timeGridDay'
        // },
        events: [
            {
                title: 'Pasta e Fagiolo',
                start: "2019-10-13T20:00:00",
                end: "2019-10-13T21:00:00",
                url: 'http://www.simplyrecipes.com/recipes/pasta_e_fagioli/'
            }
        ],
        eventClick: function(event) {
            if (event.url) {
                window.open(event.url, "_blank");
                return false;
            }
        }
    });

    console.log("this is calendar: ", calendar)

    calendar.render();

    for (let i = 0; i < actualDateArray.length; i++) {
        var planstart = actualDateArray[i] + "T" + actualTimeStartArray[i] + ":00"

        var realstart = moment(planstart).format()

        var planend = actualDateArray[i] + "T" + actualTimeEndArray[i] + ":00"

        var realend = moment(planend).format()

        console.log("plan starts: ", planstart)
        console.log("real plan starts: ", realstart)
        console.log("plan ends: ", planend)
        console.log("real plan ends: ", realend)

        var event = {
            title: "Time Slot",
            start: planstart,
            end: planend
        }
        console.log("this is what your custom event looks like: ", event)

        calendar.addEvent(event)
    }
});