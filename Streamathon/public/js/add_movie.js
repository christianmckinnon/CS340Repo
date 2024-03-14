// Hanjun Kim and Christian McKinnon CS 340 Portfolio Project
// App.js, 2/27/2024
// Citation: Code adapted from OSU 340 Github Step 5: Adding New Data
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data#modify-appjs

// This is our add_movie.js form to implement adding new Movie entries into our database

// Get the objects we need to modify
let addMovieForm = document.getElementById('add-movie-form');

// Modify the objects we need
addMovieForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTitle = document.getElementById("input-title");
    let inputDirector = document.getElementById("input-director");
    let inputYear = document.getElementById("input-year");
    let inputDuration = document.getElementById("input-duration");
    let inputLanguage = document.getElementById("input-language");

    // Get the values from the form fields
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
        title: titleValue,
        director: directorValue,
        year: yearValue,
        duration: durationValue,
        language: languageValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-movie-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputTitle.value = '';
            inputDirector.value = '';
            inputYear.value = '';
            inputDuration.value = '';
            inputLanguage.value = '';
            location.reload(); // To ensure the row updates automatically
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
    let currentTable = document.getElementById("movie-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let titleCell = document.createElement("TD");
    let directorCell = document.createElement("TD");
    let yearCell = document.createElement("TD");
    let durationCell = document.createElement("TD");
    let languageCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.movieID;
    titleCell.innerText = newRow.title;
    directorCell.innerText = newRow.director;
    yearCell.innerText = newRow.year;
    durationCell.innerText = newRow.duration;
    languageCell.innerText = newRow.language;

    // Add the Delete button when adding new movie entry
    deleteCell = document.createElement("td");
    deleteButton = document.createElement("button"); 
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function(){
        deleteMovie(newRow.movieID);
    };
    deleteCell.appendChild(deleteButton); 

    // Add the Edit button when adding a new movie entry
    editCell = document.createElement("td"); // Create a new table data cell
    editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.onclick = function(){
        updateMovie(newRow.movieID);
    };
    editCell.appendChild(editButton);

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(directorCell);
    row.appendChild(yearCell);
    row.appendChild(durationCell);
    row.appendChild(languageCell);
    row.appendChild(deleteCell);
    row.appendChild(editCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.movieID);

    // Add the row to the table
    currentTable.appendChild(row);
    
    // COMMENT OUT as we're not using Dropdown currently

    // // Find drop down menu, create a new option, fill data in the option (full name, id),
    // // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    // let selectMenu = document.getElementById("mySelect");
    // let option = document.createElement("option");
    // option.text = newRow.title;
    // option.value = newRow.movieID;
    // selectMenu.add(option);
    // // End of new step 8 code.
}