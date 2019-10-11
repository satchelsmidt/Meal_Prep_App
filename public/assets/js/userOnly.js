//globally declare this because I have no other choice
var userId

$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in, and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(data.username);
      //save userId as the variable declared earlier
      userId = data.id;
      console.log("THIS SHOULD BE THE ID OF THE LOGGED IN USER:", userId)
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

        var planDetails = {
          UserId: userId
        }

        $.post("/api/plans", planDetails, function (data) {
            console.log("THIS IS YOUR DATA:", data)
        })
    })

var button = document.getElementById('createPlan');

button.onclick = function() {
  console.log("YOU CLICKED ANOTHER BUTTON")
  location.assign('/createPlan');
}
