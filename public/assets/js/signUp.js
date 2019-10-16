$(document).ready(function(){

    sessionStorage.clear("planstart")
    sessionStorage.clear("planend")
    sessionStorage.clear("dateArray")
    sessionStorage.clear("dayArray")
    sessionStorage.clear("timeStartArray")
    sessionStorage.clear("timeEndArray")


    var signUpForm = $("form.signup");
    var userNameInput = $("input#user-name-input");
    var passwordInput = $("input#password-input")

    signUpForm.on("submit", function(event){
        event.preventDefault();
        var userData = {
            username: userNameInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.username || !userData.password){
            return;
        }

        signUpUser(userData.username, userData.password);
        userNameInput.val("");
        passwordInput.val("")
    })

    function signUpUser(username, password){
        $.post("/api/signup", {
            username: username,
            password: password
        }).then(function(data){
            window.location.replace("/home")
        }).catch(handleLoginErr);
    }

    function handleLoginErr(err){
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500)
    }

})