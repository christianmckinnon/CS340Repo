/* Hanjun Kim and Christian McKinnon CS 340 Portfolio Project
App.js, 3/15/2024
Professor Curry
Citation: Code adapted from OSU 340 Github: Node Start App - Step 8: Dynamically Updating Data
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data */

// This is our update_subtier.js form to implement updating Subscription Tier entries in our database

// Get the objects we need to modify for the Subscription Tiers entity
let updateSubTierForm = document.getElementById("update-subTier-form-ajax");

// Modify the objects we need
updateSubTierForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from UPDATE subTier FORM
    let inputSubTierID = document.getElementById("update-subTier-id");
    let inputSubscriptionType = document.getElementById("input-update-subscriptionType");
    let inputPrice = document.getElementById("input-update-price");

    // Get their values from the form fields and assign them to new variables
    let subTierIDValue = inputSubTierID.value;
    let subscriptionTypeValue = inputSubscriptionType.value;
    let priceValue = inputPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        subTierID: subTierIDValue,
        subscriptionType: subscriptionTypeValue,
        price: parseFloat(priceValue),
    }

    // No NULL values for subscriptionType or email
    if (subscriptionTypeValue == "" || priceValue == "") 
    {
        return;
    }

    console.log(data.price);
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-subTier-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table using subTierIDValue
            updateRow(xhttp.response, subTierIDValue);

            //Reset required fields
            inputSubscriptionType.value = '';
            inputPrice.value = '';
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


// This function places the newly updated values back into the SubscriptionTiers table
    function updateRow(data, subTierID){
        let parsedData = JSON.parse(data);    
        let table = document.getElementById("subTier-table");
        console.log(parsedData);

        console.log((document.getElementById("input-update-price").value));

        for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == subTierID) {

                // Get the location of the row where we found the matching person ID
                let updateRowIndex = table.getElementsByTagName("tr")[i];

                // Get td of subscriptionType, price, email, age, and language
                let subscriptionTypeTd = (document.getElementById("input-update-subscriptionType").value);
                let priceTd = (document.getElementById("input-update-price").value);
                console.log(subscriptionTypeTd);
                console.log(priceTd);

                // Dynamically update the data
                // Update the innerHTML of the table cells
                subscriptionTypeTd.innerHTML = (document.getElementById("input-update-subscriptionType").value);
                priceTd.innerHTML = (document.getElementById("input-update-price").value);
        }
     }
}


