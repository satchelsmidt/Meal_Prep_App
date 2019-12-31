// Recipe Card variables
var recipeTitle
var recipeLink
var recipeTime
var recipeServings
var finalRecipeDiv

//Global ingredients array
const ingredients = []

//Time variables (retrieved from sessionStorage)
var planStart = sessionStorage.getItem("planStart")
var planEnd = sessionStorage.getItem("planEnd")

var dateArray = sessionStorage.getItem("dateArray").split(',')

var dayArray = sessionStorage.getItem("dayArray").split(',')

var timeStartArray = sessionStorage.getItem("timeStartArray").split(',').reverse()

var timeEndArray = sessionStorage.getItem("timeEndArray").split(',').reverse()

// Document function which displays recipe cards that correspond with current plan
$("document").ready(function () {

    $.get("/api/final_plan").then(function (data) {
        console.log("Data: ", data)

        //Loop through all recipes in final plan and display cards for each
        for (let i = 0; i < data.length; i++) {
            console.log("recipe:", data[i])

            recipeTitle = data[i].recipe_title
            recipeServings = data[i].recipe_servings
            recipeTime = data[i].recipe_time
            recipeLink = data[i].recipe_link

            finalRecipeDiv = $("<div>")
            finalRecipeDiv.attr("class", "finalRecipe")

            // Dynamimcally create recipe card using variables and string literals
            var finalRecipeCard = $(`
                <div id='recipeCardFinal' class='col'">
                  <div class="card">
                    <div class="card-content uniqueContent">
                    <span class="card-title">${recipeTitle}</span>
                      <p><b>Servings:</b> ${recipeServings}</p>
                      <p><b>Cook Time:</b> ${recipeTime}</p>
                      <p><a href="${recipeLink}" target="_blank">Link to recipe</a></p>
                    </div>
                  </div>
                </div>
                `)

            $("#finalPlanDiv").append(finalRecipeCard)

            for (let ingredient of data[i].recipe_ingredients.split(',')) {
                ingredients.push(ingredient.trim())
            }
        }

        //condense master ingredients list (ingredients from all recipes) to single list, removing duplicates
        let uniqueIngredients = new Set(ingredients)

        let finalIngredients = [...uniqueIngredients]

        console.log("array of unique ingredients:", finalIngredients)

        for (let k = 0; k < finalIngredients.length; k++) {
            var ingredient = $("<li>" + "- " + finalIngredients[k] + "</li>")
            $("#ingredientsList").append(ingredient)
        }
    });
})

document.addEventListener('DOMContentLoaded', function () {

    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid', 'timeGrid'],
        defaultView: 'timeGrid',
        visibleRange: {
            start: planStart,
            end: planEnd
        },
        header: {
            left: '',
            center: 'title',
            right: ''
        },
        events: [
            {
                title: 'Pasta e Fagiolo',
                start: "2019-10-13T20:00:00",
                end: "2019-10-13T21:00:00",
                url: 'http://www.simplyrecipes.com/recipes/pasta_e_fagioli/'
            }
        ],
        eventClick: function (event) {
            if (event.url) {
                window.open(event.url, "_blank");
                return false;
            }
        }
    });

    console.log("this is calendar: ", calendar)

    calendar.render();

    for (let i = 0; i < dateArray.length; i++) {
        var planstart = dateArray[i] + "T" + timeStartArray[i] + ":00"

        var realstart = moment(planstart).format()

        var planend = dateArray[i] + "T" + timeEndArray[i] + ":00"

        var realend = moment(planend).format()

        console.log("real plan starts: ", realstart)
        console.log("real plan ends: ", realend)

        var event = {
            title: "Recipe " + (i + 1),
            start: planstart,
            end: planend
        }

        console.log("this is what your custom event looks like: ", event)

        calendar.addEvent(event)
    }

    $("#calendar").prepend("<h5>Calendar</h5>")
});