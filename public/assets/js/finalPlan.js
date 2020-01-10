//Declare plan id
let planId = parseInt(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))

//Declar recipe arr (needed throughout page)
const recipeArr = []

// Document function which displays recipe cards that correspond with current plan
$("document").ready(function () {

    //Retrieve data corresponding to plan (really only need to do this once, so consolidate at later date)
    $.get("/api/final_plan/" + planId).then(function (data) {
        //set data returned from Plan to corresponding date vars
        let planStart = data.start_date

        //Havr to add an extra day to the end for it to be visible on calendar (because times are at 00:00 hours, does not reflect normally)
        let planEnd = moment(data.end_date, 'MM-DD-YYYY').add(1, 'days')

        let planDates = JSON.parse(data.plan_dates)
        let planTimes = JSON.parse(data.plan_times)

        console.log("plan start date: ", planStart)
        console.log("plan end date: ", planEnd)
        console.log("plan dates: ", planDates)
        console.log("plan times: ", planTimes)

        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: ['dayGrid', 'timeGrid'],
            defaultView: 'timeGrid',
            visibleRange: {
                start: moment(planStart, 'MM-DD-YYYY').format('YYYY-MM-DD'),
                end: moment(planEnd, 'MM-DD-YYYY').format('YYYY-MM-DD')
            },
            header: {
                left: '',
                center: 'title',
                right: ''
            },
            //This is a custom test event
            events: [
                {
                    title: 'Pasta e Fagiolo',
                    start: "2020-01-08T20:00:00",
                    end: "2020-01-08T21:00:00",
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

        calendar.render();

        for (let i = 0; i < planDates.length; i++) {
            console.log("THIS IS RECIPE ARR: ", recipeArr)

            let recipe

            if (recipeArr[i]) {
                //recipes formatted correctly, tied to date slots
                recipe = cleanString(recipeArr[i].recipe_title)
            }
            else{
                recipe = 'no recipe'
            }

            //loop through each date and format correctly
            planDates[i] = moment(planDates[i], 'MM-DD-YYYY').format('YYYY-MM-DD')

            //set begin prep time for each day in plan
            let dayTimeStart = (planDates[i] + "T" + planTimes[i][0] + ":00")

            //set end prep time for each day in plan
            let dayTimeEnd = (planDates[i] + "T" + planTimes[i][1] + ":00")

            //formatting
            moment(dayTimeStart).format()
            moment(dayTimeEnd).format()

            //create event dynamically based on time starts and ends
            var event = {
                // title: "Recipe " + (0 + i),
                title: recipe,
                start: dayTimeStart,
                end: dayTimeEnd
            }

            console.log("Custom event: ", event)
            calendar.addEvent(event)
        }

        $("#calendar").prepend("<h5>Calendar</h5>")
    });
})

document.addEventListener('DOMContentLoaded', function () {
    $.get("/api/final_plan/" + planId).then(function (data) {
        console.log("Data: ", data)

        //declare an empty array to hold our returned recipes
        // const recipeArr = []
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

//function to capitalize recipes that come in improperly formatted
function cleanString(str) {
    if (str) {
        let newStr = []
        for (word of str.split(' ')) {
            word = word[0].toUpperCase() + word.slice(1)
            newStr.push(word)
        }
        newStr = newStr.join(' ')

        return newStr
    }
}