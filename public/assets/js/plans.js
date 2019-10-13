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
          console.log("LALALALALALALALALALA")
        console.log(userPlans)
    })

    });

    console.log("USER ID: ", UserId)

  });

