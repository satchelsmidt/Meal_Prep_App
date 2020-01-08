/* This is the home page of the app, where we set the logged in user ID in local storage for later use. When the user clicks 'create plan', a new plan is added to the DB that is linked to the user ID. When the user clicks 'view plans', they are taken to a page showing all of the plans tied to their ID */

//globally declare userId (which we will set when we get)
let userId = ''

//Run this function on page load
$(document).ready(function () {

  console.log('information:', localStorage)
  //GET request that retrieves logged in user information
  $.get("/api/user_data").then(function (data) {
    // $(".member-name").text(data.username);

    //save userId as the variable declared earlier
    userId = data.id;
    console.log("ID of logged in user:", userId)
  });
});

//On click function for the create plan button 
$("#createPlanHome").on("click", function (event) {

  //Prevent page reload
  event.preventDefault()

  //create object with plan details (userId is the only item so far)
  var planDetails = {
    UserId: userId
  }

  //Post to route that creates new plan, which adds new record to DB with only plan ID and user ID
  $.post("/api/plans", planDetails, function (data) {
    console.log("New Plan Data:", data)
  })

  //Navigate to 'create plan' page
  location.assign('/createPlan')
})