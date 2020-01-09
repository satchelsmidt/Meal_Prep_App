//Declare plan id
let planId = parseInt(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))

// Document function which displays recipe cards that correspond with current plan
$("document").ready(function () {

    //Retrieve data corresponding to plan (really only need to do this once, so consolidate at later date)
    $.get("/api/final_plan/" + planId).then(function (data) {
        console.log("Data round two: ", data)

        //set data returned from Plan to corresponding date vars
        let planStart = moment(data.start_date, 'DD-MM-YYYY').format('YYYY-MM-DD')
        let planEnd = moment(data.end_date, 'DD-MM-YYYY').format('YYYY-MM-DD')
        let planDates = data.plan_dates
        let planTimes = data.plan_times

        console.log("plan start date: ", planStart)
        console.log("plan end date: ", planEnd)
        console.log("plan dates: ", planDates)
        console.log("plan times: ", planTimes)

        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: ['dayGrid', 'timeGrid'],
            defaultView: 'timeGrid',
            visibleRange: {
                start: planStart,
                end: planEnd
            },
            duration: {
                days: 7
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

        for (let i = 0; i < planDates.length; i++) {
            var planstart = moment(planDates[i] + "T" + planTimes[i][0] + ":00").format()

            var planend = moment(planDates[i] + "T" + planTimes[i][1] + ":00").format()

            var event = {
                title: "Recipe " + (i + 1),
                start: planstart,
                end: planend
            }

            // console.log("this is what your custom event looks like: ", event)
            calendar.addEvent(event)
        }

        $("#calendar").prepend("<h5>Calendar</h5>")
    });
})

document.addEventListener('DOMContentLoaded', function () {

    $.get("/api/final_plan/" + planId).then(function (data) {
        console.log("Data: ", data)

        //declare an empty array to hold our returned recipes
        const recipeArr = []
        const ingredients = []

        //Loop through each recipe in the recipe array (tied to the plan searched)
        if (data.Recipes) {
            for (let i of data.Recipes) {
                let recipeData = i

                // push recipe data to our recipe array
                recipeArr.push(recipeData)
            }
        }

        //Loop through all recipes in final plan and display cards for each
        if (recipeArr) {
            for (let i of recipeArr) {

                let recipeTitle = i.recipe_title
                let recipeServings = i.recipe_servings
                let recipeTime = i.recipe_time
                let recipeLink = i.recipe_link

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

                for (let ingredient of i.recipe_ingredients.split(',')) {
                    ingredients.push(ingredient.trim())
                }
            }
        }

        //condense master ingredients list, remove duplicates
        let uniqueIngredients = new Set(ingredients)

        let finalIngredients = [...uniqueIngredients]

        for (let k = 0; k < finalIngredients.length; k++) {
            var ingredient = $("<li>" + "- " + finalIngredients[k] + "</li>")
            $("#ingredientsList").append(ingredient)
        }
    });
});