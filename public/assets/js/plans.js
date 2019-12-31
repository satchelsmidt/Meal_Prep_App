//Code to display a view of all plans tied to current user

$(document).ready(function () {
  //This is the API route defined in our user-api-routes page, uses GET request to figure out which user is logged in
  $.get("/api/user_data").then(function (data) {
    //save id returned as userId
    let userId = data.id;

    console.log("USER ID: ", userId)

    //Build new query to retrieve plans tied to this user
    let queryUrl = "/api/all_plans/" + userId;

    console.log("QUERY URL: ", queryUrl)

    //Use our built url in a GET request to retrieve user plans
    $.get(queryUrl, function (userPlans) {

      //Loop through returned plans and render each to the page
      for (let i = 0; i < userPlans.length; i++) {
        var planId = $("<li>")
        planId.html("Plan Id: " + userPlans[i].id);

        var planRange = $("<li>")
        planRange.html(userPlans[i].start_date + ' - ' + userPlans[i].end_date)

        var planLink = $("<li>")
        planLink.html($("<a href='#'>" + "View Plan" + "</a>"))

        $("#planList").append(planId)
        $("#planList").append(planRange)
        $("#planList").append(planLink)
        $("#planList").append($("<br>"))
      }
    })
  });
});

