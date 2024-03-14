// Hanjun Kim and Christian McKinnon CS 340 Portfolio Project
// App.js, 2/27/2024
// Citation: Code adapted from OSU 340 Github Step 8: Dynamically Updating Data
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

// This is our update_genre.js form to implement updating Genres entries in our database

// Get the objects we need to modify for the Genres entity
let updateMovieGenreForm = document.getElementById("update-movie-genre-form-ajax");

// Modify the objects we need
updateMovieGenreForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from UPDATE Genres FORM
    let inputMovieTitle = document.getElementById("input-update-movie-id");
    let inputGenreType = document.getElementById("input-update-genre-id");


    // Get their values from the form fields and assign them to new variables
    let movieTitleValue = inputMovieTitle.value;
    let genreTypeValue = inputGenreType.value;


    // Put our data we want to send in a javascript object
    let data = {
        title: movieTitleValue,
        genreType: genreTypeValue,
    }

    // No NULL values for genreType or email
    // if (genreTypeValue == "") 
    // {
    //     return;
    // }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-movie-genre-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table using movieTitleValue
            updateRow(xhttp.response, movieTitleValue);

            //Reset required fields
            inputGenreType.value = '';
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


// This function places the newly updated values back into the Genre table
    function updateRow(data, movieID){
        let parsedData = JSON.parse(data);    
        let table = document.getElementById("movie-genre-table");

        for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == movieID) {

                // Get the location of the row where we found the matching person ID
                let updateRowIndex = table.getElementsByTagName("tr")[i];

                // Get td of genreType, price, email, age, and language
                let genreTypeTd = (document.getElementById("input-update-genre-id").value);

                // Dynamically update the data
                // Update the innerHTML of the table cells
                genreTypeTd.innerHTML = (document.getElementById("input-update-genre-id").value);
        }
     }
}


