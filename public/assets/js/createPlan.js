//This file is where we are taking in the data from our refined AJAX call to compose a plan (made up of a select few recipes)

/////////CALENDAR SECTION////////////

//idea is to have selectable input boxes which allow user to select time available throughout the week. Recipes returned are then displayed on this page. 



//cuisine types to include in search (can be comma separated list)

var cuisines = ""

//function that occurs on click of either cuisine button
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


var recipeTitle

$("#recipeSearch").on("click", function () {
    console.log("LIST OF CUISINSE:", cuisines)

    console.log("LIST OF DIETS:", diets)

    var queryURL = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + cuisines + "&diet=" + diets + "&number=2&addRecipeInformation=true&apiKey=10fd6276ba57493797da32beaf541d00"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        console.log("Data Returned:", data)

        for (let i = 0; i < data.results.length; i++) {
            //
            //TODO: devclare all vars globally
            recipeTitle = data.results[i].title

            console.log("TITLE OF RECIPE: ", recipeTitle)

            var title = $("<h1>").text(recipeTitle)

            $("#recipesReturned").append(title)
            //
            var recipeImg = data.results[i].image

            console.log("IMAGE OF RECIPE: ", recipeImg)

            var img = $("<img>").attr("src", recipeImg)

            $("#recipesReturned").append(img)
            //
            var recipeLink = data.results[i].sourceUrl

            console.log("LINK OF RECIPE: ", recipeLink)

            $("#recipesReturned").append("<h5>Recipe Source:</h5>" + recipeLink)
            $("#recipesReturned").append("<br>")
            //
            var recipeCuisines = data.results[i].cuisines.toString()

            console.log("CUISINSE OF RECIPE: ", recipeCuisines)

            var cuisineTypes = $("<p>").append("<h5>Cuisine Types: <h5>"+ recipeCuisines)

            console.log("array string attempt (cuisines): ", recipeCuisines)

            $("#recipesReturned").append(cuisineTypes)
            //
            var recipeTime = data.results[i].readyInMinutes.toString()

            console.log("COOK TIME OF RECIPE: ", recipeTime)
            console.log("type of time: ", typeof (recipeTime))

            var time = $("<p>").append("Cook Time: ", recipeTime, "minutes")

            console.log("number string attempt (time): ", recipeTime.toString())

            $("#recipesReturned").append(time)
            //
            var recipeServings = data.results[i].servings

            console.log("SERVINGS OF RECIPE: ", recipeServings)

            var servings = $("<p>").text("Servings: ", recipeServings.toString(), " servings")

            console.log("number string attempt (servings): ", recipeServings.toString())

            $("#recipesReturned").append(servings)
            //
            var ingredientsArr = []

            for (let k = 0; k < data.results[i].analyzedInstructions[0].steps.length; k++) {

                var ingredient = data.results[i].analyzedInstructions[0].steps[k].ingredients

                for (let j = 0; j < ingredient.length; j++) {
                    ingredientsArr.push(ingredient[j].name)
                }
                console.log("Ingredients at this step:", ingredient)
            }

            console.log("Array of various ingredients:", ingredientsArr)

            var ingredientsList = $("<p>").text("Ingredients: ", ingredientsArr.toString())

            console.log("array string attempt (ingredients): ", ingredientsList.toString())

            $("#recipesReturned").append(ingredientsList)
            //
            var addRecipe = $("<button>").attr("value", "Add to Plan")

            addRecipe.attr("class", "addRecipe")

            addRecipe.text("Add recipe to plan!")

            addRecipe.attr("data-id", data.results[i])

            addRecipe.data("title", recipeTitle)

            $("#recipesReturned").append(addRecipe)

            //STORE THESE BUT DO NOT DISPLAY ON PAGE
            var recipeId = data.results[i].id
            console.log("ID OF RECIPE: ", recipeId.toString())

            var stepsArr = []
            //
        }
    })
})

$("#recipesReturned").on("click", ".addRecipe", function(event){

    event.preventDefault()
    console.log("YOU CLICKED")

    console.log("THIS: ", $(this))

    var theActualRecipeTitle = $(this).data("title")

    console.log(theActualRecipeTitle)

    var recipeDetails = {
        recipe_title: theActualRecipeTitle
    }
    console.log(recipeDetails)

    $.post("/api/recipes", recipeDetails, function(data) {
        console.log("THIS IS YOUR DATA:", data)
})
})





//cuisine types to NOT include in search (can be comma separated list)
var dontLike = "Greek"

