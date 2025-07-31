//Account userId
document.addEventListener("DOMContentLoaded", () => {
    const accountUsername = document.getElementById("account-username");
    const accountProfilePic = document.getElementById("account-profile");
    const accountIdDisplay = document.getElementById("account-id");

    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const currentUsername = localStorage.getItem("currentUser");
    const currentUser = users.find(user => user.username === currentUsername);

    if (currentUser) {
        // Assign an ID if not already assigned
        if (!currentUser.id) {
            currentUser.id = "#" + String(users.indexOf(currentUser) + 1).padStart(4, "0");
            localStorage.setItem("registeredUsers", JSON.stringify(users));
        }

        // Show username and ID
        if (accountUsername) accountUsername.textContent = currentUser.username;
        if (accountProfilePic && currentUser.profilePic) {
            accountProfilePic.src = currentUser.profilePic;
        }

        if (accountIdDisplay) accountIdDisplay.textContent = "ID: " + currentUser.id;
    } else {
        if (accountUsername) accountUsername.textContent = "Guest";
        if (accountIdDisplay) accountIdDisplay.textContent = "ID: N/A";
    }
});

//Account Form
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("accountForm");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const address1Input = document.getElementById("address1");
    const address2Input = document.getElementById("address2");
    const cityInput = document.getElementById("city");
    const stateInput = document.getElementById("state");
    const postcodeInput = document.getElementById("postcode");
    const oldPasswordInput = document.getElementById("old-password");
    const newPasswordInput = document.getElementById("new-password");
    const prefix = "+60-";
    const allInputs = [usernameInput, emailInput, phoneInput, address1Input, address2Input, cityInput, stateInput, postcodeInput, oldPasswordInput, newPasswordInput];

    //User data from localStorage
    let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    let loggedInUser = users.find(user => user.username === localStorage.getItem("currentUser"));

    //Pre-fill form with loggedin user's info
    if (loggedInUser) {
        usernameInput.value = loggedInUser.username;
        emailInput.value = loggedInUser.email;
        phoneInput.value = loggedInUser.phone;
        address1Input.value = loggedInUser.address1 || "";
        address2Input.value = loggedInUser.address2 || "";
        cityInput.value = loggedInUser.city || "";
        stateInput.value = loggedInUser.state || "";
        postcodeInput.value = loggedInUser.postcode || "";
    }

    phoneInput.addEventListener("focus", () => {
        if (phoneInput.value === "") {
            phoneInput.value = prefix;
            phoneInput.setSelectionRange(prefix.length, prefix.length);
        }
    });

    phoneInput.addEventListener("keydown", (e) => {
        const pos = phoneInput.selectionStart;
        if (
            (e.key === "Backspace" && pos <= prefix.length) ||
            (e.key === "Delete" && pos < prefix.length) ||
            (e.key === "ArrowLeft" && pos <= prefix.length) ||
            e.key === "Home") {
            e.preventDefault();
            phoneInput.setSelectionRange(prefix.length, prefix.length);
        }
    });

    phoneInput.addEventListener("keypress", (e) => {
        const pos = phoneInput.selectionStart;

        // Only allow digits after the prefix
        if (pos >= prefix.length && !/\d/.test(e.key)) {
            e.preventDefault();
        }
    });

    //Limit phone number to 10 digits
    phoneInput.addEventListener("input", () => {
        const value = phoneInput.value;

        if (value.startsWith(prefix)) {
            let digitsOnly = value.slice(prefix.length).replace(/\D/g, "");

            digitsOnly = digitsOnly.slice(0, 10);

            phoneInput.value = prefix + digitsOnly;
        } else {
            phoneInput.value = prefix;
        }
    });

    //Remove postcode non-digit characters
    postcodeInput.addEventListener("input", () => {
        postcodeInput.value = postcodeInput.value.replace(/\D/g, "")
    });

    //Error handling functions
    const showError = (input, message) => {
        const errorDiv = document.getElementById(`${input.id}-error`);
        const group = input.closest(".input-group");
        errorDiv.textContent = message;
        group.classList.add("error");
        input.style.borderColor = "#ff4d4d";
    };

    const clearError = (input) => {
        const errorDiv = document.getElementById(`${input.id}-error`);
        const group = input.closest(".input-group");
        errorDiv.textContent = "";
        group.classList.remove("error");
        input.style.borderColor = "#d7b789";
    };

    //Validation patterns
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    const phoneRegex = /^\+60-\d{8,10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    //Real-time validation
    allInputs.forEach(input => {
        input.addEventListener("input", () => {
            const value = input.value.trim();

            if (input === usernameInput && value.length === 0) showError(input, "Username is required");
            else if (input === emailInput && (!emailRegex.test(value))) showError(input, "Use a valid Gmail address");
            else if (input === phoneInput && (!phoneRegex.test(value))) showError(input, "Enter 8-10 digits after +60-");
            else if ([address1Input, cityInput, stateInput, postcodeInput].includes(input) && value === "") showError(input, "Required");
            else if (input === oldPasswordInput && value === "") showError(input, "Old password is required");
            else if (input === newPasswordInput && (!passwordRegex.test(value))) showError(input, "Min 8 chars, include letters & numbers");
            else clearError(input);
        });
    });

    //Form submission logic
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const address1 = address1Input.value.trim();
        const address2 = address2Input.value.trim();
        const city = cityInput.value.trim();
        const state = stateInput.value.trim();
        const postcode = postcodeInput.value.trim();
        const oldPassword = oldPasswordInput.value.trim();
        const newPassword = newPasswordInput.value.trim();

        let hasError = false;

        //Basic validation
        if (username === "") { 
            showError(usernameInput, "Username is required"); 
            hasError = true; 
        }
        if (!emailRegex.test(email)) { 
            showError(emailInput, "Use a valid Gmail address"); 
            hasError = true; 
        }
        if (!phoneRegex.test(phone)) { 
            showError(phoneInput, "Enter 8-10 digits after +60-"); 
            hasError = true; 
        }
        if (address1 === "") { 
            showError(address1Input, "Required"); 
            hasError = true; 
        }
        if (city === "") { 
            showError(cityInput, "Required"); 
            hasError = true; 
        }
        if (state === "") { 
            showError(stateInput, "Required"); 
            hasError = true; 
        }
        if (postcode === "" || !/^\d{5}$/.test(postcode)) { 
            showError(postcodeInput, "5-digit postcode required"); 
            hasError = true; 
        }

        let passwordToSave = loggedInUser.password;

        //Password change logic
        if (newPassword !== "") {
            if (oldPassword === "") {
                showError(oldPasswordInput, "Please enter your current password");
                hasError = true;
            } else if (oldPassword !== loggedInUser.password) {
                showError(oldPasswordInput, "Old password does not match");
                hasError = true;
            } else if (!passwordRegex.test(newPassword)) {
                showError(newPasswordInput, "Min 8 chars, include letters & numbers");
                hasError = true;
            } else {
                passwordToSave = newPassword;
            }
        }

        if (hasError) return;

        //Save updated user info
        const updatedUser = {
            ...loggedInUser,
            username,
            email,
            phone,
            address1,
            address2,
            city,
            state,
            postcode,
            password: passwordToSave
        };

        users = users.map(u => u.username === loggedInUser.username ? updatedUser : u);
        localStorage.setItem("registeredUsers", JSON.stringify(users));
        localStorage.setItem("currentUser", updatedUser.username);

        alert("Account updated successfully!");
        location.reload();
    });

    // Profile Picture Selection
    const profilePicDiv = document.querySelector(".profile-pic");
    const editIcon = document.querySelector(".edit-icon");
    const picModal = document.getElementById("picSelectModal");
    const closePicModal = document.getElementById("closePicModal");

    //Load existing profile picture
    if (loggedInUser && loggedInUser.profilePic) {
        profilePicDiv.style.backgroundImage = `url(${loggedInUser.profilePic})`;
    } else {
        profilePicDiv.style.backgroundImage = `url(images/cat_profile.png)`;
    }

    //Open profile picture modal
    editIcon.addEventListener("click", () => {
        picModal.classList.add("active");
    });

    //close profile picture modal
    closePicModal.addEventListener("click", () => {
        picModal.classList.remove("active");
    });

    //Handle profile picture selection
    document.querySelectorAll(".pic-options img").forEach(img => {
        img.addEventListener("click", () => {
            const selectedPic = img.getAttribute("data-pic");
            profilePicDiv.style.backgroundImage = `url(${selectedPic})`;
            if (loggedInUser) {
                loggedInUser.profilePic = selectedPic;
                users = users.map(u => u.username === loggedInUser.username ? loggedInUser : u);
                localStorage.setItem("registeredUsers", JSON.stringify(users));
            }
            picModal.classList.remove("active");
        });
    });

    //Logout functionality
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("currentUser");
        alert("You have been logged out.");
        window.location.href = "home.html";
    });
});
