$(document).ready(function () {
    // This file does a GET request to pull recipe data from the current plan
    $.get("/api/final_plan").then(function (data) {
        console.log("whatever our data is", data)

    });
});