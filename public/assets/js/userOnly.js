$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(data.username);
    });
  });



  //add in a create plan 'on click' function that:
  // does a get request to see (for that speficic user) what the highest plan number in db is
  // creates/resets local var 'plan num' or something to create a new plan

  //OR maybe just have it create a new plan entry tied to that user and populate with some data
  /////////////SIMILAR TO BELOW CODE//////

  $("#createPlan").on("click", function (event) {
    
        console.log("CLICKED A BUTTON")
        event.preventDefault()

        // var planDetails = {
        //   start_date: 01/01/2019
        // }

        var planDetails
    
        $.post("/api/plans", planDetails, function (data) {
            console.log("THIS IS YOUR DATA:", data)
        })
    })
