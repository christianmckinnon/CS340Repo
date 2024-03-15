/* Hanjun Kim and Christian McKinnon CS 340 Portfolio Project
App.js, 3/15/2024
Professor Curry
Citation: Code adapted from OSU 340 Github: Node Start App - Step 8: Dynamically Updating Data
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data */

// This is our update_user.js form to implement updating User entries in our database

// Get the objects we need to modify for the Users entity
let updateUserForm = document.getElementById("update-user-form-ajax");

// Modify the objects we need
updateUserForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from UPDATE USER FORM
    let inputUserID = document.getElementById("update-user-id");
    let inputFirstName = document.getElementById("input-update-firstName");
    let inputLastName = document.getElementById("input-update-lastName");
    let inputEmail = document.getElementById("input-update-email");
    let inputAge = document.getElementById("input-update-age");
    
    // Get their values from the form fields and assign them to new variables
    let userIDValue = inputUserID.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let ageValue = inputAge.value;

    // No NULL values for firstName or email
    if (firstNameValue == "" || lastNameValue == "" || emailValue == "") 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        userID: userIDValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        age: ageValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-user-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table using userIDValue
            updateRow(xhttp.response, userIDValue);

            // Reset required fields
            inputFirstName.value = '';
            inputLastName.value = '';
            inputEmail.value = '';
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

// This function places the newly updated values back into the Users table
function updateRow(data, userID){
    let parsedData = JSON.parse(data);    
    let table = document.getElementById("user-table");
    console.log(parsedData);

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == userID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of firstName, lastName, email, age, and language
            let firstNameTd = (document.getElementById("input-update-firstName").value);
            let lastNameTd = (document.getElementById("input-update-lastName").value);
            let emailTd = (document.getElementById("input-update-email").value);
            let ageTd = (document.getElementById("input-update-age").value);

            // Dynamically update the data
            // Update the innerHTML of the table cells
            firstNameTd.innerHTML = (document.getElementById("input-update-firstName").value);
            lastNameTd.innerHTML = (document.getElementById("input-update-lastName").value);
            emailTd.innerHTML = (document.getElementById("input-update-email").value);
            ageTd.innerHTML = (document.getElementById("input-update-age").value);
       }
    }
}
