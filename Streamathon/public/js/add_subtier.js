// Hanjun Kim and Christian McKinnon CS 340 Portfolio Project
// App.js, 2/27/2024
// Citation: Code adapted from OSU 340 Github Step 5: Adding New Data
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data#modify-appjs


// This is our add_subtier.js form to implement adding new Subscription Tier entries into our database

// Get the objects we need to modify
let addUserForm = document.getElementById('add-subTier-form');

// Modify the objects we need
addUserForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from: These correspond to the INSERT table in users.hbs
    let inputSubscriptionType = document.getElementById("input-subscriptionType");
    let inputPrice = document.getElementById("input-price");


    // Get the values from the form fields
    let subscriptionTypeValue = inputSubscriptionType.value;
    let priceValue = inputPrice.value;
  
    // No NULL values for subscriptionType or price
    if (subscriptionTypeValue == "" || priceValue == "") 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        subscriptionType: subscriptionTypeValue,
        price: priceValue,
    }
    
    // Setup our AJAX request for add-subTier-ajax
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-subTier-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputSubscriptionType.value = '';
            inputPrice.value = '';
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
    let currentTable = document.getElementById("subTier-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let subscriptionTypeCell = document.createElement("TD");
    let priceCell = document.createElement("TD");


    // Fill the cells with correct data
    idCell.innerText = newRow.subTierID;
    subscriptionTypeCell.innerText = newRow.subscriptionType;
    priceCell.innerText = newRow.price;

    // No Delete Functionality for this Entity

    // Add the Edit button when adding a new movie entry
    editCell = document.createElement("td"); // Create a new table data cell
    editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.onclick = function(){
        updateUser(newRow.subTierID);
    };
    editCell.appendChild(editButton);

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(subscriptionTypeCell);
    row.appendChild(priceCell);
    row.appendChild(editCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.subTierID);

    // Add the row to the table
    currentTable.appendChild(row);

    // COMMENT OUT as we're not using Dropdown currently

    // // Find drop down menu, create a new option, fill data in the option (full name, id),
    // // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    // let selectMenu = document.getElementById("mySelect");
    // let option = document.createElement("option");
    // option.text = newRow.title;
    // option.value = newRow.subTierID;
    // selectMenu.add(option);
    // // End of new step 8 code.
}