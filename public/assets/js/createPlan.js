//This file is where we are taking in the data from our refined AJAX call to compose a plan (made up of a select few recipes)




/////////CALENDAR SECTION////////////

//idea is to have selectable input boxes which allow user to select time available throughout the week. Recipes returned are then displayed on this page. 

//////END CALENDAR SECTION/////////////

//cuisine types to include in search (can be comma separated list)
//Begins as empty and cuisings are added, separated by commas as necessary
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

    var queryURL = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + cuisines + "&diet=" + diets + "&number=2&addRecipeInformation=true&apiKey=10fd6276ba57493797da32beaf541d00"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        console.log("Data Returned: ", data)

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
            var link = $("<a target='_blank' href='"+recipeLink+"'>"+"Recipe Link"+"</a>")
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
            // var ingredientsList = $("<p>").append("Ingredients: ", ingredientsArr)
            // recipeDiv.append(ingredientsList)
            //
            //STEPS INFORMATION (DON't NEED TO DISPLAY)
            stepsArr = stepsArr.toString()
            console.log("Array of various steps:", stepsArr)

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
        }

        var createPlan = $("<button>")
        createPlan.attr("id", "createPlan")
        createPlan.text("CREATE YOUR PLAN!")

        $("#recipesReturned").append($("<br>"))
        $("#recipesReturned").append(createPlan)
        //This button will:
        //Take user to a new page ('plan' or similar)
        //aggregate all the recipes that have been selected and added on this page
            //HOW TO DO???
        //'GET' the data from those recipes and display them on a visual calendar on the next page
        
        //PLANS api should:
            //take in total minutes that user has on various days
    })
})


//modify below code to create new plan and add each recipe to plan+recipe table



$(document).on("click", ".addRecipe", function (event) {

    console.log("CLICKED A BUTTON")
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
        recipe_steps: theActualRecipeSteps
    }
    console.log(recipeDetails)

    $.post("/api/recipes", recipeDetails, function (data) {
        console.log("THIS IS YOUR DATA:", data)
    })
})

//TODO:

//1. cuisine types to NOT include in search (can be comma separated list). Similar construction to existing params
var dontLike = "Greek"

