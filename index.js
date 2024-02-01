function saveUserData() {
    // Get form elements
    var form = document.getElementById("userForm");

    // Validate form fields
    if (!validateForm(form)) {
        return; // Do not proceed if validation fails
    }

    var formData = new FormData(form);

    // Retrieve existing data from local storage
    var existingData = JSON.parse(localStorage.getItem("userData")) || [];

    var email = formData.get("email");
    if (isEmailAlreadyExists(email, existingData)) {
        alert("Email already entered. Please use a different email.");
        return;
    }

    // Add new form data to the array
    var newData = {};
    formData.forEach(function(value, key) {
        newData[key] = value;
    });
    existingData.push(newData);

    // Store the updated array in local storage
    localStorage.setItem("userData", JSON.stringify(existingData));

    // Render the table based on the stored data
    renderUserDataTable(existingData);

    // Clear the form after rendering data
    form.reset();
}

function isEmailAlreadyExists(email, data) {
    return data.some(function(entry) {
        return entry.email === email;
    });
}







// Function to validate the form
function validateForm(form) {
    var name = form.elements["name"].value;
    var email = form.elements["email"].value;
    var mobile = form.elements["mobile"].value;
    var password = form.elements["password"].value;

    // Check if any field is empty
    if (name.trim() === "" || email.trim() === "" || mobile.trim() === "" || password.trim() === "") {
        alert("All fields are required. Please fill in all the details.");
        return false;
    }

    // Validate email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email address. Please enter a valid email.");
        return false;
    }

    // Validate mobile number format (10 digits)
    var mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
        alert("Invalid mobile number. Please enter a 10-digit mobile number.");
        return false;
    }

    // Validate password format (8 characters, at least one uppercase, one lowercase, one number, and one special character)
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Invalid password. Password should be 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
        return false;
    }

    return true; // Form is valid
}


// Function to render the table based on stored data
function renderUserDataTable(data) {
    // Create a table to display the user data
    var table = document.createElement("table");
    table.classList.add("userDataTable");

    // Create table head
    var thead = document.createElement("thead");
    var headRow = document.createElement("tr");

    // Use the keys of the first entry as column headings
    var columns = Object.keys(data[0]);

    columns.forEach(function(column) {
        var th = document.createElement("th");
        th.textContent = column;
        headRow.appendChild(th);
    });

    thead.appendChild(headRow);
    table.appendChild(thead);

    // Create table body
    var tbody = document.createElement("tbody");

    // Populate table with data
    data.forEach(function(entry) {
        var dataRow = document.createElement("tr");

        columns.forEach(function(column) {
            var td = document.createElement("td");
            td.textContent = entry[column];
            dataRow.appendChild(td);
        });

        tbody.appendChild(dataRow);
    });

    table.appendChild(tbody);

    // Update the userData container with the new table
    var userDataContainer = document.getElementById("userData");
    userDataContainer.innerHTML = "";
    userDataContainer.appendChild(table);
}

// Call renderUserDataTable when the page loads
window.onload = function() {
    var storedData = JSON.parse(localStorage.getItem("userData")) || [];
    renderUserDataTable(storedData);
};








