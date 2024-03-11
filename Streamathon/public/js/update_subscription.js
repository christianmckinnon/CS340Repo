// Hanjun Kim and Christian McKinnon CS 340 Portfolio Project
// App.js, 2/27/2024
// Citation: Code adapted from OSU 340 Github Step 8: Dynamically Updating Data
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

// This is our update_subscription.js form to implement updating Subscription entries in our database

// Get the objects we need to modify for the Subscriptions entity
let updateSubscriptionForm = document.getElementById("update-subscription-form-ajax");

// Modify the objects we need
updateSubscriptionForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

     // Get form fields we need to get data from: These correspond to the INSERT table in subscriptions.hbs
     let inputsubscriptionID = document.getElementById("update-subscription-id");
     let inputUserName = document.getElementById("input-update-userID");
     let inputSubscriptionType = document.getElementById("input-update-subTierID");
     let inputSubscriptionStatus = document.getElementById("input-update-subscription-status");
     let inputAutoRenew = document.getElementById("input-update-auto-renew");
     
     // Get the values from the form fields
     let subscriptionIDValue= inputsubscriptionID.value;
     let userNameValue = inputUserName.value;
     let subscriptionTypeValue = inputSubscriptionType.value;
     let subscriptionStatusValue = inputSubscriptionStatus.value;
     let autoRenewValue = inputAutoRenew.value;


    // Put our data we want to send in a javascript object
    let data = {
        subscriptionID: subscriptionIDValue,
        userName: userNameValue,
        subscriptionType: subscriptionTypeValue,
        subscriptionStatus: subscriptionStatusValue,
        autoRenew: autoRenewValue
    }

    // Anything can be NULL here except for subscriptionID which is AI

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-subscription-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table using subscriptionIDValue
            updateRow(xhttp.response, subscriptionIDValue);

            // Reset required fields
            inputSubscriptionType.value = '';
            inputSubscriptionStatus.value = '';
            inputAutoRenew.value = '';

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


// This function places the newly updated values back into the Subscriptions table
    function updateRow(data, subscriptionID){
        let parsedData = JSON.parse(data);    
        let table = document.getElementById("subscription-table");

        for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == subscriptionID) {

                // Get the location of the row where we found the matching person ID
                let updateRowIndex = table.getElementsByTagName("tr")[i];

                // Get td of subscriptionType, price, email, age, and language
                let userNameTypeTd = (document.getElementById("input-update-userID").value);
                let subscriptionTypeTd = (document.getElementById("input-update-subTierID").value);
                let subscriptionStatusTd = (document.getElementById("input-update-subscription-status").value);
                let autoRenewTd = (document.getElementById("input-update-auto-renew").value);


                // Dynamically update the data
                // Update the innerHTML of the table cells
                userNameTypeTd.innerHTML = (document.getElementById("input-update-userID").value);
                subscriptionTypeTd.innerHTML = (document.getElementById("input-update-subTierID").value);
                subscriptionStatusTd.innerHTML = (document.getElementById("input-update-subscription-status").value);
                autoRenewTd.innerHTML = (document.getElementById("input-update-auto-renew").value);
        }
     }
}


