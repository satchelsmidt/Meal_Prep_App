$(document).ready(function () {
    // This file does a GET request to pull recipe data from the current plan
    // $.get("/api/final_plan").then(function (data) {
    //     console.log("whatever our data is", data)

    // });
});

var recipeTitle
var recipeLink
var recipeTime
var recipeServings
var ingredients

var finalRecipeDiv

// var finalPlan = $("#finalPlan")

$("#finalPlan").on("click", function(){
    console.log("CLICKED A FINAL PLAN BUTTON")

    $.get("/api/final_plan").then(function (data) {
        console.log("whatever our data is", data)

        for (let i = 0; i < data.length; i++) {
            console.log("recipe:", data[i])

            finalRecipeDiv = $("<div>")
            finalRecipeDiv.attr("class", "finalRecipe")

            recipeTitle = data[i].recipe_title
            console.log("TITLE: ", recipeTitle)
            var title = $("<h1>").text(recipeTitle)
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

            //Create/add to shopping list for user

            var ingredients = data[i].recipe_ingredients

            var ingredientsSplit = ingredients.split(',')

            console.log("array of separate ingredients:", ingredientsSplit)

            for (let k = 0; k < ingredientsSplit.length; k++) {
                var ingredient = $("<li>"+ingredientsSplit[k]+"</li>")
                // var ingredient = $("<li>")
                // ingredient.innerHTML = ingredientsSplit[k]

                $("#ingredientsDiv").append(ingredient)
            }



        }


    });
})