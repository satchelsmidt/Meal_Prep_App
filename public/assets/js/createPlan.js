//This file is where the user selects parameters that will make up their plan

//Declare plan id/date array globally so they are reachable throughout file
let planId
let dateArray = []

$(document).ready(function () {
    //Retrieve current user id
    $.get("/api/user_data").then(function (data) {
        let userId = data.id;

        //GET request to determine most current plan for user (the one we will modify on this page)
        $.get("/api/current_plan/" + userId).then(function (data) {
            planId = data[0].id;
            console.log("current plan id: ", planId)
        });
    });
});

//Determines dates of plan start and end
$("#planDateSubmit").on("click", function (event) {
    event.preventDefault()

    //prevent further messing with input field 
    $('#mealPlanStart').prop('readonly', true)

    //Grab value of date picker input
    let date = $('#mealPlanStart').val()

    //Use moment.js to format value to legit date format
    let planStart = moment(date, 'YYYY-MM-DD')

    //Add in an additional 7 days to create week-long range for plan
    let planEnd = planStart.clone()
    planEnd.add(6, "days")

    //Create object holding data + values we want to update for plan
    let planData = {
        id: planId,
        start_date: planStart.format("MM-DD-YYYY"),
        end_date: planEnd.format("MM-DD-YYYY")
    }

    //post to api route that grabs plan (based on id) and inserts start + end data into it
    $.ajax({
        method: "PUT",
        url: "api/plans",
        data: planData
    }).then(function (data) {

        //run function to render time input fields
        getDates(planStart, planEnd)
    })

    //Create button for user to submit the inputted times
    var submitTimes = $("<button>")
    submitTimes.attr("id", "submitTimes")
    submitTimes.attr("class", "btn waves-effect waves-light pink")
    submitTimes.text("Submit Times")
    $("#planRange").append(submitTimes)
})

//Iterate through 7 days (starting from input date) and render user time input fields to page appropriately
function getDates(planStart, planEnd) {

    //declare our array to store day names
    let dayArray = []

    //input to render for each date
    var dateHeader = $("<h5>Input the time slot you are available each day for prepping: </h5>")
    $("#planRange").prepend(dateHeader)

    //loop from plan start to end
    while (planStart <= planEnd) {
        dayArray.push(planStart.format('dddd'))
        dateArray.push(planStart.format("MM-DD-YYYY"))
        planStart = planStart.add(1, 'days')
    }

    console.log(dayArray)
    console.log(dateArray)

    // //Save date info to plan in form of string
    // let planDates = {
    //     plan_dates: JSON.stringify(dateArray)
    // }

    // //Send updatd date info to plan object
    // $.ajax({
    //     method: "PUT",
    //     url: "api/plans",
    //     data: planDates
    // })

    //Dynamically create time-range selection boxes
    for (let i = 0; i < dateArray.length; i++) {

        var date = $("<li>" +
            dayArray[i] +
            ", " +
            dateArray[i] +
            "<br>" +
            "<div class='row'><div class='col-4 border border-3'><input class='timeInput' type='time' id='time" + i + "01' data-time='" + i + "01'></input></div><div class='col-4 border border-3 rounded'><input class='timeInput' type='time' id='time" + i + "02' data-time='" + i + "02'></input></div></div></div>" +
            "</li>")

        //set id of created element
        date.attr("id", "date")

        //append to page
        $("#dates").append(date)
    }
}

//Function that calculates available time throughout the week for the user based on inputs above
$(document).on("click", "#submitTimes", function () {

    let timesArr = []

    //loop through all dates in plan
    for (let i = 0; i <= dateArray.length - 1; i++) {

        //grab id's (dynamically generated) of each input slot
        let timeOne = $(("#time" + i + "01")).val()
        let timeTwo = $(("#time" + i + "02")).val()

        // push each time range as an array into the predefined array
        timesArr.push([timeOne, timeTwo])
    }

    console.log('array of start and end times: ', timesArr)

    //TODO: Stop storing locally
    sessionStorage.setItem("timeStartArray", timeStartArray)
    sessionStorage.setItem("timeEndArray", timeEndArray)

    //////////////OLD METHOD (Still used to generate calendar)/////////
    // //loop through all dates in plan
    // for (let i = dateArray.length; i >= 0 ; i--) {

    //     //grab id's (dynamically generated) of each input slot
    //     var timeOne = $(("#time" + i + "01")).val()

    //     // console.log("time one:", timeOne)
    //     timeStartArray.push(timeOne)

    //     var timeTwo = $(("#time" + i + "02")).val()
    //     // console.log("time two:", timeTwo)

    //     timeEndArray.push(timeTwo)
    // }
});

//cuisine types to include in search (can be comma separated list)
//Begins as empty and cuisines are added, separated by commas as necessary
var cuisines = ""

//function that occurs on click of any cuisine button, adds type of cuisine on button to AJAX query
$(".cuisineButton").on("click", function () {
    var cuisine = $(this).val().trim()
    if (cuisines === "") {
        cuisines += cuisine
    }
    else {
        cuisines += ("," + cuisine)
    }
    //make button unclickable after clicked
    $(this).attr("disabled", true)

    //TODO: future development, user clicks button again to remove item from list
})

//Same functionality as cuisine buttons, only adds dietary preferences
var diets = ""

$(".dietButton").on("click", function () {
    var diet = $(this).val().trim()
    if (diets === "") {
        diets += diet
    }
    else {
        diets += ("," + diet)
    }
    $(this).attr("disabled", true)
})

//Same functionality as cuisine/diet
var intolerances = ""

$(".intoleranceButton").on("click", function () {
    var intolerance = $(this).val().trim()
    if (intolerances === "") {
        intolerances += intolerance
    }
    else {
        intolerances += ("," + intolerance)
    }
    $(this).attr("disabled", true)
})

//TODO:
//Add cuisine types to NOT include in search (can be comma separated list). Similar construction to existing params
var dontLike = "Greek"

//Where we define all of the data we would like to return from our AJAX call for later storage in our DB
let recipeTitle
let recipeImg
let recipeLink
let recipeCuisines
let recipeTime
let recipeServings
let ingredientsArr
let stepsArr

$("#recipeSearch").on("click", function (event) {

    event.preventDefault()

    var queryURL = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + cuisines + "&diet=" + diets + "&intolerances=" + intolerances + "&number=5&addRecipeInformation=true&apiKey=10fd6276ba57493797da32beaf541d00"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        // console.log("Data Returned: ", data)

        //Loop through data returned from AJAX call
        for (let i = 0; i < data.results.length; i++) {

            //if returned data does not include instructions, will not render, so pass that item and continue looping
            if (data.results[i].analyzedInstructions[0] === undefined) {
                continue;
            }

            //Declare variables needed to dynamically construct cards
            recipeTitle = data.results[i].title
            recipeImg = data.results[i].image
            recipeLink = data.results[i].sourceUrl
            recipeCuisines = data.results[i].cuisines.toString()
            recipeTime = data.results[i].readyInMinutes.toString()
            recipeServings = data.results[i].servings.toString()

            // Store but do not display
            ingredientsArr = []
            stepsArr = []

            for (let k = 0; k < data.results[i].analyzedInstructions[0].steps.length; k++) {

                var ingredient = data.results[i].analyzedInstructions[0].steps[k].ingredients
                for (let j = 0; j < ingredient.length; j++) {
                    ingredientsArr.push(ingredient[j].name)
                }

                var step = data.results[i].analyzedInstructions[0].steps[k].step
                stepsArr.push(step)
            }

            ingredientsArr = ingredientsArr.toString();
            stepsArr = stepsArr.toString()

            //Create button 'add recipe' that allows user to add recipe to plan
            var addRecipe = $("<button>")
            addRecipe.text("Add recipe to plan!")
            addRecipe.attr("class", "addRecipe")

            //Tie API data for each recipe to the 'add recipe' button
            addRecipe.data("title", recipeTitle)
            addRecipe.data("img", recipeImg)
            addRecipe.data("link", recipeLink)
            addRecipe.data("cuisines", recipeCuisines)
            addRecipe.data("time", recipeTime)
            addRecipe.data("servings", recipeServings)
            addRecipe.data("ingredients", ingredientsArr)
            addRecipe.data("steps", stepsArr)

            //Create div to hold each individual recipe card content
            var recipeCard = $("<div id='recipeCard' class='col'>")

            //Use string literal to create template for each recipe card and content within
            var recipeContent = $(`
              <div class="card" id='card${i}'>
                <div class="card-image">
                <img src="${recipeImg}" class="card-img-top">
                </div>
                <div class="card-content uniqueContent">
                <span class="card-title">${recipeTitle}</span>
                  <p><b>Cuisines:</b> ${recipeCuisines}</p>
                  <p><b>Servings:</b> ${recipeServings}</p>
                  <p><b>Cook Time:</b> ${recipeTime} Minutes</p>
                  <p><a href="${recipeLink}" target="_blank">Link to recipe</a></p>
                </div>
              </div>`)

            //Append 'add recipe' button to each recipe card template
            recipeContent.append(addRecipe)

            //Append each recipe card template to a recipe card div
            recipeCard.append(recipeContent)

            //Apply each full recipe card to a div containing all recipe cards returned
            $("#recipesReturned").append(recipeCard)
        }



        //After all cards created, append 'create plan' button to finalize plan creation and move to next page
        var
            createPlan = $("<button>")
        createPlan.attr("id", "createPlan")
        createPlan.attr("class", "btn waves-effect waves-light pink")
        createPlan.text("CREATE YOUR PLAN!")

        $("#submitPlan").append($("<br>"))
        $("#submitPlan").append(createPlan)
    })
})

var recipeIdArr = []
var totalRecipeMins = 0
var count = 1

$(document).on("click", ".addRecipe", function (event) {

    // console.log("COUNT OF YOUR COUNT VARIABLE:", count)
    $(this).attr("disabled", true)
    event.preventDefault()

    var theActualRecipeTitle = $(this).data("title")
    var theActualRecipeImage = $(this).data("img")
    var theActualRecipeLink = $(this).data("link")
    var theActualRecipeCuisines = $(this).data("cuisines")
    var theActualRecipeTime = $(this).data("time")
    var theActualRecipeServings = $(this).data("servings")
    var theActualRecipeIngredients = $(this).data("ingredients")
    var theActualRecipeSteps = $(this).data("steps")

    var recipeDetails = {
        recipe_title: theActualRecipeTitle,
        recipe_image: theActualRecipeImage,
        recipe_link: theActualRecipeLink,
        recipe_cuisines: theActualRecipeCuisines,
        recipe_time: theActualRecipeTime,
        recipe_servings: theActualRecipeServings,
        recipe_ingredients: theActualRecipeIngredients,
        recipe_steps: theActualRecipeSteps,
    }
    // console.log(recipeDetails)

    $.post("/api/recipes", recipeDetails, function (data) {
        // console.log("THIS IS YOUR DATA:", data)
    }).then(function () {

        for (let i = count; i > 0; i--) {
            $.get("/api/recipes_desc").then(function (data) {

                // console.log("time for each recipe: ", parseInt(data[0].recipe_time))

                totalRecipeMins = totalRecipeMins + parseInt(data[0].recipe_time)

                // if (totalRecipeMins > totalMins) {
                //     alert('Adding this recipe to plan would exceed total available time for the week')
                //     //figure out how to change 'disabled' attribute to false before function returns (so that un-addable recipe can be clicked still)
                //     return
                // }

                // console.log("This is your data (desc_id):", data)
                recipeIdArr.push(data[0].id);
            })
        }
    })
});



$(document).on("click", "#createPlan", function (event) {

    // console.log("CLICKED A BUTTON (create plan)")
    event.preventDefault()
    location.href = "/plans/" + planId

    for (let i = 0; i < recipeIdArr.length; i++) {

        var planRecipeDetails = {
            RecipeId: recipeIdArr[i],
            PlanId: planId
        }

        // console.log("Data we are sending:", planRecipeDetails)

        $.post("/api/recipe_plans", planRecipeDetails, function (data) {
            // console.log("reached post request")
            // console.log("THIS IS YOUR DATA(list of recipes selected + linked plans?):", data)
        })
    }
});
