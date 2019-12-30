//where we store the code for reaching a view of all plans

$(document).ready(function() {
    var UserId
    // This file just does a GET request to figure out which user is logged in, and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
    //   $(".member-name").text(data.username);
      //save userId as the variable declared earlier
      UserId = data.id;
      console.log("USER ID: ", UserId)
      var queryUrl = "/api/all_plans/" + UserId;

      console.log("QUERY URL: ", queryUrl)
      
      $.get(queryUrl, function(userPlans){
        console.log(userPlans)

        for (let i = 0; i < userPlans.length; i++) {
          var planId = $("<li>")
          planId.html("Plan Id: " + userPlans[i].id);

          var planRange=$("<li>")
          planRange.html(userPlans[i].start_date + ' - '+ userPlans[i].end_date)

          var planLink=$("<li>")
          planLink.html($("<a href='#'>" + "View Plan" + "</a>"))

          $("#planList").append(planId)
          $("#planList").append(planRange)
          $("#planList").append(planLink)
          $("#planList").append($("<br>"))
          
        }

    })

    });

    console.log("USER ID: ", UserId)

  });

