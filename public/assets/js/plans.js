//where we store the code for reaching a view of all plans

$.get("/api/all_plans").then(function(data){

    console.log("plans associated with current user:", data)
    
})