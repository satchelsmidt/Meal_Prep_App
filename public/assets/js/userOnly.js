var userId

$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page



    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(data.username);
      userId = data.id;
      console.log("THIS SHOULD BE THE ID OF THE LOGGED IN USER:", userId)
    });
  });



  //add in a create plan 'on click' function that:
  // does a get request to see (for that speficic user) what the highest plan number in db is
  // creates/resets local var 'plan num' or something to create a new plan

  //OR maybe just have it create a new plan entry tied to that user and populate with some data
  /////////////SIMILAR TO BELOW CODE//////

  // var planStart = "01/01/2019"
  // var planEnd = "01/01/2019"
  // var maxMins = 400
  // var totalMins = 400

  $("#createPlan").on("click", function (event) {
    
        console.log("CLICKED A BUTTON")
        event.preventDefault()

        

        // var planDetails = {
        //   start_date: planStart,
        //   end_date: planEnd,
        //   maxMins: maxMins,
        //   totalMins: totalMins
        // };
    


        var planDetails = {
          UserId: userId
        }



        $.post("/api/plans", planDetails, function (data) {
            console.log("THIS IS YOUR DATA:", data)
        })
    })
