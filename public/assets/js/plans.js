//This page displays a list view of all plans tied to current user, with plan ID, start/end dates, and a link to the plan page

$(document).ready(function () {

  //Retrieve current user id
  $.get("/api/user_data").then(function (data) {
    let userId = data.id;
    console.log("user id:", userId)

    //Build new query to retrieve plans tied to this user
    let queryUrl = "/api/all_plans/" + userId;

    //Use our built url in a GET request v to retrieve user plans
    $.get(queryUrl, function (userPlans) {

      // TODO: For each rendered plan, on click maybe store the number in the url and retrieve it on the next page load to ensure correct plan is loaded

      //Loop through returned plans and render each to the page as list items
      for (let i = 0; i < userPlans.length; i++) {

        console.log(userPlans[i].start_date)
        console.log(moment(userPlans[i].start_date).format("MM-DD-YYYY"))

        var planId = $("<li>")
        planId.html("Plan Id: " + userPlans[i].id);

        var planRange = $("<li>")
        planRange.html(userPlans[i].start_date + ' — ' + userPlans[i].end_date)

        var planLink = $("<li>")
        planLink.html($("<a id='planLink' data-id='" + userPlans[i].id + "' href='/plans/" + userPlans[i].id + "'>" + "View Plan" + "</a>"))

        $("#planList").append(planId)
        $("#planList").append(planRange)
        $("#planList").append(planLink)
        $("#planList").append($("<br>"))
      }
    })
  });
});

$('#planLink').on('click', function(){
  console.log('you clicked link')
})