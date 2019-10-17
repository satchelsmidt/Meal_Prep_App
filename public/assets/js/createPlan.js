//This file is where the user selects parameters that will make up their plan
//Declare plan id number globally
var planId

var dateArray = []
var dayArray = []
var timeStartArray = []
var timeEndArray = []

$(document).ready(function () {
    //GET request to determine which plan is currently being worked on
    $.get("/api/current_plan").then(function (data) {
        console.log("Data: ", data)
        planId = data[0].id;
        console.log("ID OF THE CURRENT PLAN:", planId)
    });
});

$("#planDateSubmit").on("click", function (event) {
    event.preventDefault()

    var planStart = new Date($('#mealPlanStart').val())
    console.log(planStart)
    // day = planStart.getDate() + 1;
    // month = planStart.getMonth() + 1;
    // year = planStart.getFullYear();

    var planEnd = new Date();
    planEnd.setDate(planStart.getDate() + 6)

    function getDates(planStart, planEnd) {
        var dateHeader = $("<h5>Input the time you are available to Prep each day:</h5>")
        $("#planRange").prepend(dateHeader)

        // var dateArray = []
        // var dayArray = []

        var currentDate = moment(planStart).add(1, 'days');
        // var currentDate = moment(planStart)

        var beginPlan = currentDate.format("YYYY-MM-DD")
        console.log("CURRENT DATE (store locally)", beginPlan)

        // localStorage.setItem("planStart", beginPlan)
        sessionStorage.setItem("planStart", beginPlan)


        // var endPlan = moment(planEnd).add(1, 'days').format("YYYY-MM-DD")
        var endPlan = moment(planEnd).format("YYYY-MM-DD")
        console.log("plan end date in YYYY-MM-DD format:", endPlan)

        // localStorage.setItem("planEnd", endPlan)
        sessionStorage.setItem("planEnd", endPlan)


         // var stopDate = moment(planEnd).add(1, 'days')
        var stopDate = moment(planEnd)
        while (currentDate <= stopDate) {
            dayArray.push(moment(currentDate).format('dddd'))
            dateArray.push(moment(currentDate).format("YYYY-MM-DD"))
            currentDate = moment(currentDate).add(1, 'days')
        }

        // localStorage.setItem("dayArray", dayArray)
        // localStorage.setItem("dateArray", dateArray)
        sessionStorage.setItem("dayArray", dayArray)
        sessionStorage.setItem("dateArray", dateArray)
        console.log(dayArray)
        console.log(dateArray)

        for (let i = 0; i < dateArray.length; i++) {
            var date = $("<li>" + dayArray[i] + ", " + dateArray[i] + "<br>" + " <input type='time' id='time" + i + "01' data-time='" + i + "01'></input> - <input type='time' id='time" + i + "02' data-time='" + i + "02'></input>" + "</li>" + "<br>")
            date.attr("id", "date")

            $("#dates").append(date)
        }
    }
    getDates(planStart, planEnd)

    var submitTimes = $("<button>")
    submitTimes.attr("id", "submitTimes")
    submitTimes.text("Submit Times")

    $("#planRange").append(submitTimes)
})

//Function that calculates available time throughout the week for the user based on inputs above
$(document).on("click", "#submitTimes", function (event) {
    // var timeStartArray = []
    // var timeEndArray = []

    for (let i = 6; i >= 0; i--) {
        // Section where we calculate available timeslots to input on Calendar next page
        var timeOne = $(("#time" + i + "01")).val()
        console.log("time one:", timeOne)
        timeStartArray.push(timeOne)

        var timeTwo = $(("#time" + i + "02")).val()
        console.log("time two:", timeTwo)

        timeEndArray.push(timeTwo)
    }

    // localStorage.setItem("timeStartArray", timeStartArray)
    // localStorage.setItem("timeEndArray", timeEndArray)
    
    sessionStorage.setItem("timeStartArray", timeStartArray)
    sessionStorage.setItem("timeEndArray", timeEndArray)
    console.log('array of start times: ', timeStartArray)
    console.log('array of end times: ', timeEndArray)

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
    $(this).attr("disabled", true)
    console.log("CUISINE:", cuisine)
})

//Same functionality as cuisine var and function, only adds dietary preferences
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
    console.log("DIET:", diet)
})

//Where we define all of the data we would like to return from our AJAX call for later storage in our DB
var recipeTitle
var recipeImg
var recipeLink
var recipeCuisines
var recipeTime
var recipeServings
var ingredientsArr
var stepsArr

var recipeDiv

$("#recipeSearch").on("click", function () {

    console.log("BUTOTN CLICK")


    var queryURL = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + cuisines + "&diet=" + diets + "&number=2&addRecipeInformation=true&apiKey=10fd6276ba57493797da32beaf541d00"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        console.log("Data Returned: ", data)

        console.log("BUTTON CLICK")

        //TEST THIS

        // recipeDiv = $("<div>")
        // recipeDiv.attr("class", "uniqueRecipe")

        // let output = $("<div class='row'>")

        // let output = $("<div>")

        // for (let i = 0; i < data.results.length; i++) {
        //     recipeImg = data.results[i].image

            // <div class="row"> //DO NOT INCLUDE
            // output += `
            // <div class="col s12 m6">
            //   <div class="card">
            //     <div class="card-image">
            //     <img src="${recipeImg}" class="card-img-top">
            //     <span class="card-title">Card Title</span>
            //       <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
            //     </div>
            //     <div class="card-content">
            //       <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
            //     </div>
            //   </div>
            // </div>
            // `
            /* </div> */ //ALSO DO NOT INCLUDE
            // output += $("</div>")

            // $("#recipesReturned").append(output)
        // }



        //For loop to iterate through returned recipes
        for (let i = 0; i < data.results.length; i++) {
            //Create div within div to hold each recipe
            recipeDiv = $("<div>")
            recipeDiv.attr("class", "uniqueRecipe")

            //Globally declared vars are defined here
            recipeTitle = data.results[i].title
            console.log("TITLE: ", recipeTitle)
            var title = $("<h1>").text(recipeTitle)
            recipeDiv.append(title)

            //

            recipeImg = data.results[i].image
            console.log("IMAGE: ", recipeImg)
            var img = $("<img>").attr("src", recipeImg)
            recipeDiv.append(img)
            recipeDiv.append("<br>")

            //

            recipeLink = data.results[i].sourceUrl
            console.log("LINK: ", recipeLink)
            var link = $("<a target='_blank' href='" + recipeLink + "'>" + "Recipe Link" + "</a>")
            recipeDiv.append(link)

            //

            recipeCuisines = data.results[i].cuisines.toString()
            console.log("CUISINES: ", recipeCuisines)
            var cuisineTypes = $("<p>").append("Cuisine Types: ", recipeCuisines)
            recipeDiv.append(cuisineTypes)

            //

            recipeTime = data.results[i].readyInMinutes.toString()
            console.log("COOK TIME: ", recipeTime)
            var time = $("<p>").append("Cook Time: ", recipeTime, " minutes")
            recipeDiv.append(time)

            //

            recipeServings = data.results[i].servings.toString()
            console.log("SERVINGS: ", recipeServings)
            var servings = $("<p>").append("Servings: ", recipeServings, " servings")
            recipeDiv.append(servings)

            //
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

            console.log("INGREDIENTS ARR:", ingredientsArr)
            console.log("INGREDIENTS ARR (STRING):", ingredientsArr.toString())

            ingredientsArr = ingredientsArr.toString();

            // Not displaying this data
            stepsArr = stepsArr.toString()
            console.log("Array of steps:", stepsArr)

            //Append 'add to plan' button
            var addRecipe = $("<button>")
            addRecipe.attr("class", "addRecipe")
            addRecipe.text("Add recipe to plan!")

            //Add all data to button because we need to link it to each buttonclick
            addRecipe.data("title", recipeTitle)
            addRecipe.data("img", recipeImg)
            addRecipe.data("link", recipeLink)
            addRecipe.data("cuisines", recipeCuisines)
            addRecipe.data("time", recipeTime)
            addRecipe.data("servings", recipeServings)
            addRecipe.data("ingredients", ingredientsArr)
            addRecipe.data("steps", stepsArr)

            recipeDiv.append(addRecipe)

            $("#recipesReturned").append(recipeDiv)
            $("#recipesReturned").append($("<br>"))
            $("#recipesReturned").append($("<br>"))
        }

        var createPlan = $("<button>")
        createPlan.attr("id", "createPlan")
        createPlan.text("CREATE YOUR PLAN!")

        $("#recipesReturned").append($("<br>"))
        $("#recipesReturned").append(createPlan)
    })
})

var recipeIdArr = []
var totalRecipeMins = 0
var count = 1

$(document).on("click", ".addRecipe", function (event) {

    console.log("COUNT OF YOUR COUNT VARIABLE:", count)
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
    console.log(recipeDetails)

    $.post("/api/recipes", recipeDetails, function (data) {
        console.log("THIS IS YOUR DATA:", data)
    }).then(function () {

        for (let i = count; i > 0; i--) {
            $.get("/api/recipes_desc").then(function (data) {

                console.log("time for each recipe: ", parseInt(data[0].recipe_time))

                totalRecipeMins = totalRecipeMins + parseInt(data[0].recipe_time)

                // if (totalRecipeMins > totalMins) {
                //     alert('Adding this recipe to plan would exceed total available time for the week')
                //     //figure out how to change 'disabled' attribute to false before function returns (so that un-addable recipe can be clicked still)
                //     return
                // }

                console.log("This is your data (desc_id):", data)
                recipeIdArr.push(data[0].id);

                console.log("THIS SHOULD BE THE array of recipes we have selected:", recipeIdArr)
                console.log("total Recipes selected time: ", totalRecipeMins)
            })
        }
    })
});

$(document).on("click", "#createPlan", function (event) {

    console.log("CLICKED A BUTTON (create plan)")
    event.preventDefault()
    location.href = "/finalPlan"

    for (let i = 0; i < recipeIdArr.length; i++) {

        var planRecipeDetails = {
            RecipeId: recipeIdArr[i],
            PlanId: planId
        }

        console.log("Data we are sending:", planRecipeDetails)

        $.post("/api/recipe_plans", planRecipeDetails, function (data) {
            console.log("reached post request")
            console.log("THIS IS YOUR DATA(list of recipes selected + linked plans?):", data)
        })
    }
})

//TODO:
//1. cuisine types to NOT include in search (can be comma separated list). Similar construction to existing params
var dontLike = "Greek"

