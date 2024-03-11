// Hanjun Kim and Christian McKinnon CS 340 Portfolio Project
// App.js, 2/27/2024
// Citation: Code adapted from OSU 340 Github Step 5: Adding New Data
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data#modify-appjs


// This is our add_user.js form to implement adding new User entries into our database

// Get the objects we need to modify
let addUserForm = document.getElementById('add-user-form');

// Modify the objects we need
addUserForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from: These correspond to the INSERT table in users.hbs
    let inputFirstName = document.getElementById("input-firstName");
    let inputLastName = document.getElementById("input-lastName");
    let inputEmail = document.getElementById("input-email");
    let inputAge = document.getElementById("input-age");

    // Get the values from the form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let ageValue = inputAge.value;

    // No NULL values for firstName, lastName, email
    if (firstNameValue == "" || lastNameValue == "" || emailValue == "") 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        age: ageValue,
    }
    
    // Setup our AJAX request for add-user-ajax
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-user-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputEmail.value = '';
            inputAge.value = '';
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
    let currentTable = document.getElementById("user-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let ageCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.userID;
    firstNameCell.innerText = newRow.firstName;
    lastNameCell.innerText = newRow.lastName;
    emailCell.innerText = newRow.email;
    ageCell.innerText = newRow.age;

    // Add the Delete button when adding new movie entry
    deleteCell = document.createElement("td");
    deleteButton = document.createElement("button"); 
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function(){
        deleteUser(newRow.userID);
    };
    deleteCell.appendChild(deleteButton); 

    // Add the Edit button when adding a new movie entry
    editCell = document.createElement("td"); // Create a new table data cell
    editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.onclick = function(){
        updateUser(newRow.userID);
    };
    editCell.appendChild(editButton);

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(ageCell);
    row.appendChild(deleteCell);
    row.appendChild(editCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.userID);

    // Add the row to the table
    currentTable.appendChild(row);
    // Reload the page to dynamically update the table
    location.reload();

    // COMMENT OUT as we're not using Dropdown currently

    // // Find drop down menu, create a new option, fill data in the option (full name, id),
    // // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    // let selectMenu = document.getElementById("mySelect");
    // let option = document.createElement("option");
    // option.text = newRow.title;
    // option.value = newRow.userID;
    // selectMenu.add(option);
    // // End of new step 8 code.
}