/* Hanjun Kim and Christian McKinnon CS 340 Portfolio Project
App.js, 3/15/2024
Professor Curry
Citation: Code adapted from OSU 340 Github: Node Start App - Step 8: Dynamically Updating Data
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data */

// This is our update_movie.js form to UPDATE Movie entries in our database

// Get the objects we need to modify for the Movies entity
let updateMovieForm = document.getElementById("update-movie-form-ajax");

// Modify the objects we need
updateMovieForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputMovieID = document.getElementById("update-movie-id");
    let inputTitle = document.getElementById("input-update-title");
    let inputDirector = document.getElementById("input-update-director");
    let inputYear = document.getElementById("input-update-year");
    let inputDuration = document.getElementById("input-update-duration");
    let inputLanguage = document.getElementById("input-update-language");
    
    
    // Get their values from the form fields and assign them to new variables
    let movieIDValue = inputMovieID.value;
    let titleValue = inputTitle.value;
    let directorValue = inputDirector.value;
    let yearValue = inputYear.value;
    let durationValue = inputDuration.value;
    let languageValue = inputLanguage.value;

    // No NULL values for Title or Year
    if (titleValue == "" || yearValue == "") 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        movieID: movieIDValue,
        title: titleValue,
        director: directorValue,
        year: yearValue,
        duration: durationValue,
        language: languageValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-movie-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table using movieIDValue
            updateRow(xhttp.response, movieIDValue);

            // Reset required fields
            inputTitle.value = '';
            inputYear.value = '';
            // Reload the page to dynamically update the table
            location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// This function places the newly updated values back into the Movies table
function updateRow(data, movieID){
    let parsedData = JSON.parse(data);    
    let table = document.getElementById("movie-table");
    console.log(parsedData);

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == movieID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of title, director, year, duration, and language
            let titleTd = (document.getElementById("input-update-title").value);
            let directorTd = (document.getElementById("input-update-director").value);
            let yearTd = (document.getElementById("input-update-year").value);
            let durationTd = (document.getElementById("input-update-title").value);
            let languageTd = (document.getElementById("input-update-language").value);

            // Dynamically update the data
            titleTd.innerHTML = (document.getElementById("input-update-title").value);
            directorTd.innerHTML = (document.getElementById("input-update-director").value);
            yearTd.innerHTML = (document.getElementById("input-update-year").value);
            durationTd.innerHTML = (document.getElementById("input-update-title").value);
            languageTd.innerHTML = (document.getElementById("input-update-language").value);
       }
    }
}
