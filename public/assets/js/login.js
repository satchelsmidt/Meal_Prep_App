$(document).ready(function() {
    //clear local storage or something
    localStorage.clear()

    console.log(localStorage)

    // Getting references to our form and inputs
    var loginForm = $("form.login");
    var userNameInput = $("input#user-name-input");
    var passwordInput = $("input#password-input");
  
    // When the form is submitted, we validate there's a username and password entered
    loginForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        username: userNameInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.username || !userData.password) {
        return;
      }
  
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.username, userData.password);
      userNameInput.val("");
      passwordInput.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(username, password) {
      $.post("/api/login", {
        username: username,
        password: password
      })
        .then(function() {
          window.location.replace("/home");
          // If there's an error, log the error
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  });