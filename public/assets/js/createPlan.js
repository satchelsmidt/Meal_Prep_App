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
            var recipeTitle = data.results[i].title

            console.log("TITLE OF RECIPE: ", recipeTitle)

            var title = $("<p>").text(recipeTitle)

            $("#recipesReturned").append(title)
            //

            //
            var recipeImg = data.results[i].image

            console.log("IMAGE OF RECIPE: ", recipeImg)

            var img = $("<img>").attr("src", recipeImg)

            $("#recipesReturned").append(img)
            //

            //
            // var recipeLink = data.results[i].sourceUrl

            // console.log("LINK OF RECIPE: ", recipeLink)

            // var link = $("<a href="+recipeLink+">")

            // $("#recipesReturned").append("<h5>Recipe Source:</h5>")
            // $("#recipesReturned").append(link)
            //

            var recipeCuisines = data.results[i].cuisines

            console.log("CUISINSE OF RECIPE: ", recipeCuisines)

            var cuisineTypes = $("<p>").text("Cuisine Types: ", recipeCuisines)

            $("#recipesReturned").append(cuisineTypes)

            //
            var recipeTime = data.results[i].readyInMinutes

            console.log("COOK TIME OF RECIPE: ", recipeTime)
            console.log("type of time: ", typeof (recipeTime))

            var time = $("<p>").text("Cook Time: ", recipeTime)

            $("#recipesReturned").append(time)
            //

            //
            var recipeServings = data.results[i].servings

            console.log("SERVINGS OF RECIPE: ", recipeServings)

            var servings = $("<p>").text("Servings: ", recipeServings)

            $("#recipesReturned").append(servings)


            //STORE THESE BUT DO NOT DISPLAY ON PAGE
            var recipeId = data.results[i].id
            console.log("ID OF RECIPE: ", recipeId)

            var stepsArr = []

            //

            var ingredientsArr = []

            for (let k = 0; k < data.results[i].analyzedInstructions[0].steps.length; k++) {
                var ingredient = data.results[i].analyzedInstructions[0].steps[k].ingredients

                for (let j = 0; j < ingredient.length; j++) {
                    ingredientsArr.push(ingredient[j].name)
                }



                console.log("This should be some sort of ingredients idk:", ingredient)

            }

            var addRecipe = $("<button>").attr("value", "Add to Plan")

            addRecipe.attr("data-id", data.results[i])

            $("#recipesReturned").append(addRecipe)

            // var button = $("<button>").attr("value", "Add to Plan!" ).attr("id" = "button"+ data[i])

            console.log(button)
        }
    })
})


//cuisine types to NOT include in search (can be comma separated list)
var dontLike = "Greek"

//Diet types to take into account for search


//lets say that the user has selected x random recipes: once this is done, we grab the id's of these selected recipes:

// var selectedRecipes = [246727, 446450, 525578]

//note: 246727 should be Pasta e fagioli, 446450 should be sweet potato alfredo, 525578 should be Springtime Crockpot Minestrone


//NO LONGER RELEVANT
//export our recipe ID data to plan_controller.js
// module.exports = { selectedRecipes };

//When 

