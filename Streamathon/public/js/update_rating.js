// Hanjun Kim and Christian McKinnon CS 340 Portfolio Project
// App.js, 2/27/2024
// Citation: Code adapted from OSU 340 Github Step 8: Dynamically Updating Data
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data


// Get the objects we need to modify for the Rating entity
let updateRatingForm = document.getElementById("update-rating-form-ajax");

// Modify the objects we need
updateRatingForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputRatingID = document.getElementById("update-rating-id");
    let inputUserID = document.getElementById("input-update-userID");
    let inputMovieID = document.getElementById("input-update-movieID");
    let inputUserRating = document.getElementById("input-update-user-rating");
    let inputRatingDate = document.getElementById("input-update-rating-date");

    // Get the values from the form fields
    let ratingIDValue = inputRatingID.value;
    let userIDValue = inputUserID.value;
    let movieIDValue = inputMovieID.value;
    let userRatingValue = inputUserRating.value;
    let ratingDateValue = inputRatingDate.value;

    // currently the database table for rating does not allow updating values to NULL
    // so we must abort if being bassed NULL for any attributes

    // if (isNaN(userIDValue)) 
    // {
    //     return;
    // }

    // Put our data we want to send in a javascript object
    let data = {
        ratingID: ratingIDValue,
        userID: userIDValue,
        movieID: movieIDValue,
        userRating: userRatingValue,
        ratingDate: ratingDateValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-rating-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to res=olve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, ratingIDValue);

            // Reset all fields
            inputUserRating.value = '';
            inputRatingDate.value = '';
            location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

function updateRow(data, ratingID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("ratings-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == ratingID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of Ratings attributes
            let userIDTd = (document.getElementById("input-update-userID").value);
            let movieIDTd = (document.getElementById("input-update-movieID").value);
            let userRatingTd = (document.getElementById("input-update-user-rating").value);
            let ratingDateTd = (document.getElementById("input-update-rating-date").value);

            // Reassign using innterHTML
            userIDTd.innerHTML = (document.getElementById("input-update-userID").value);
            movieIDTd.innerHTML = (document.getElementById("input-update-movieID").value);
            userRatingTd.innerHTML = (document.getElementById("input-update-user-rating").value);
            ratingDateTd.innerHTML = (document.getElementById("input-update-rating-date").value);
       }
    }
}