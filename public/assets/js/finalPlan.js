// Recipe Card variables
var recipeTitle
var recipeLink
var recipeTime
var recipeServings
var ingredients

var finalRecipeDiv

//Time variables (retrieve from sessionStorage)
var planStart = sessionStorage.getItem("planStart")
var planEnd = sessionStorage.getItem("planEnd")

var dateArray = sessionStorage.getItem("dateArray")
var actualDateArray = dateArray.split(',')

var dayArray = sessionStorage.getItem("dayArray")
var actualDayArray = dayArray.split(',')

var timeStartArray = sessionStorage.getItem("timeStartArray")
var actualTimeStartArray = timeStartArray.split(',')
actualTimeStartArray.reverse()

var timeEndArray = sessionStorage.getItem("timeEndArray")
var actualTimeEndArray = timeEndArray.split(',')
actualTimeEndArray.reverse()

//Console logs (for testing)
console.log("string of dates:", dateArray)
console.log("string of days:", dayArray)
console.log("string of time ONEs:", timeStartArray)
console.log("string of time TWOs:", timeEndArray)

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
                <div id='recipeCard' class='col'">
                  <div class="card">
                    <div class="card-content uniqueContent">
                    <span class="card-title">${recipeTitle}</span>
                      <p><b>Servings:</b> ${recipeServings}</p>
                      <p><b>Cook Time:</b> ${recipeTime}</p>
                      <p><a href="${recipeLink}">Link to recipe</a></p>
                    </div>
                  </div>
                </div>
                `)

            $("#finalPlanDiv").append(finalRecipeCard)

            var ingredients = data[i].recipe_ingredients
            var ingredientsSplit = ingredients.split(',')

            console.log("array of separate ingredients:", ingredientsSplit)

            for (let k = 0; k < ingredientsSplit.length; k++) {
                var ingredient = $("<li>" + "- " + ingredientsSplit[k] + "</li>")
                $("#ingredientsList").append(ingredient)
                // }
            }
        }
        // recipeTitle = data[i].recipe_title
        // console.log("TITLE: ", recipeTitle)
        // var title = $("<h3>").text(recipeTitle)
        // finalRecipeDiv.append(title)

        // recipeLink = data[i].recipe_link
        // console.log("LINK: ", recipeLink)
        // var link = $("<a target='_blank' href='" + recipeLink + "'>" + "Recipe Link" + "</a>")
        // finalRecipeDiv.append(link)

        // recipeTime = data[i].recipe_time
        // console.log("COOK TIME: ", recipeTime)
        // var time = $("<p>").append("Cook Time: ", recipeTime, " minutes")
        // finalRecipeDiv.append(time)

        // recipeServings = data[i].recipe_servings
        // console.log("SERVINGS: ", recipeServings)
        // var servings = $("<p>").append("Servings: ", recipeServings, " servings")
        // finalRecipeDiv.append(servings)

        // $("#finalPlanDiv").append(finalRecipeDiv)

    });
})

document.addEventListener('DOMContentLoaded', function () {

    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        // plugins: ['interaction', 'dayGrid', 'timeGrid'],
        plugins: ['dayGrid', 'timeGrid'],
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
        eventClick: function (event) {
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

    $("#calendar").prepend("<h5>Calendar:</h5>")

});