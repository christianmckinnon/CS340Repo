// Hanjun Kim and Christian McKinnon CS 340 Portfolio Project
// App.js, 3/14/2024
// Citation: Code adapted from OSU 340 Github Step 5: Adding New Data
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data#modify-appjs


// This is our add_genre.js form to implement adding new MovieGenre entries into our database

// Get the objects we need to modify
let addMovieGenreForm = document.getElementById('add-movie-genre-form');

// Modify the objects we need
addMovieGenreForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from: These correspond to the INSERT table in genres.hbs
    let inputMovieType = document.getElementById("input-moviegen");
    let inputGenreType = document.getElementById("input-genmovie");
    
    // Get the values from the form fields
    let movieTypeValue = inputMovieType.value;
    let genreTypeValue = inputGenreType.value;
    
    // No NULL values for genreType or price
    // if (movieTypeValue || genreTypeValue == "") 
    // {
    //     return;
    // }

    // Put our data we want to send in a javascript object
    let data = {
        title: movieTypeValue,
        genreType: genreTypeValue
    }
    
    // Setup our AJAX request for add-genres-ajax
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-movie-genre-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputGenreType.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("movie-genre-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 3 cells
    let row = document.createElement("TR");
    //let idCell = document.createElement("TD");
    let movieTypeCell = document.createElement("TD");
    let genreTypeCell = document.createElement("TD");


    // Fill the cells with correct data
    movieTypeCell.innerText = newRow.title;
    genreTypeCell.innerText = newRow.genreType;


    // Add the Edit button when adding a new movie entry
    editCell = document.createElement("td"); // Create a new table data cell
    editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.onclick = function(){
        updateMovieGenre(newRow.title);
    };
    editCell.appendChild(editButton);

    // Add the cells to the row 
    row.appendChild(movieTypeCell);
    row.appendChild(genreTypeCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    //row.setAttribute('data-value', newRow.movieID);

    // Add the row to the table
    currentTable.appendChild(row);
    location.reload();

    // COMMENT OUT as we're not using Dropdown currently

    // // Find drop down menu, create a new option, fill data in the option (full name, id),
    // // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    // let selectMenu = document.getElementById("mySelect");
    // let option = document.createElement("option");
    // option.text = newRow.title;
    // option.value = newRow.genreID;
    // selectMenu.add(option);
    // // End of new step 8 code.
}