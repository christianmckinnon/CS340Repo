// Hanjun Kim and Christian McKinnon CS 340 Portfolio Project
// App.js, 2/27/2024
// Citation: Code adapted from OSU 340 Github Step 5: Adding New Data
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data#modify-appjs

// Get the objects we need to modify
let addRatingForm = document.getElementById('add-rating-form');

// Modify the objects we need
addRatingForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUser = document.getElementById("input-userID");
    let inputMovie = document.getElementById("input-title");
    let inputRating = document.getElementById("input-rating");
    let inputDate = document.getElementById("input-date");

    // Get the values from the form fields
    let userValue = inputUser.value;
    let movieValue = inputMovie.value;
    let ratingValue = inputRating.value;
    let dateValue = inputDate.value;

    // Put our data we want to send in a javascript object
    let data = {
        userID: userValue,
        movieID: movieValue,
        userRating: ratingValue,
        ratingDate: dateValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-rating-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputUser.value = '';
            inputMovie.value = '';
            inputRating.value = '';
            inputDate.value = '';
            location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            location.reload()
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("ratings-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let userIDCell = document.createElement("TD");
    let movieIDCell = document.createElement("TD");
    let userRatingCell = document.createElement("TD");
    let ratingDateCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");
    let editCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.ratingID;
    userIDCell.innerText = newRow.userID;
    movieIDCell.innerText = newRow.movieID;
    userRatingCell.innerText = newRow.userRating;
    ratingDateCell.innerText = newRow.ratingDate;

    // Add the Delete button when adding new rating entry
    deleteCell = document.createElement("td");
    deleteButton = document.createElement("button"); 
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function(){
        deleteRating(newRow.ratingID);
    };
    deleteCell.appendChild(deleteButton);

    // Add the Edit button when adding a new movie entry
    editCell = document.createElement("td"); // Create a new table data cell
    editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.onclick = function(){
        updateRating(newRow.ratingID);
    };
    editCell.appendChild(editButton);

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(userIDCell);
    row.appendChild(movieIDCell);
    row.appendChild(userRatingCell);
    row.appendChild(ratingDateCell);
    row.appendChild(deleteCell);
    row.appendChild(editCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.ratingID);

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