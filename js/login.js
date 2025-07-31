document.addEventListener("DOMContentLoaded", () => {
    //Get references to form and inputs
    const form = document.getElementById("login-form");
    const usernameInput = document.getElementById("login-username");
    const passwordInput = document.getElementById("login-password");

    //When login form is submitted
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        //Reset input border color to default
        [usernameInput, passwordInput].forEach(input => {
            input.style.borderColor = "#d7b789";
        });

        //Check for empty fields
        if (username === "" || password === "") {
            if (username === "") usernameInput.style.borderColor = "#ff4d4d";
            if (password === "") passwordInput.style.borderColor = "#ff4d4d";
            alert("Please enter both username and password.");
            return;
        }

        //Get registered users from localStorage
        let storedUsers = [];
        try {
            storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        } catch (e) {
            console.error("Invalid localStorage data");
        }

        //If no user is found in storage
        if (storedUsers.length === 0) {
            alert("No registered user found. Please sign up first.");
            return;
        }

        //Check if username and password match a registered user
        const matchedUser = storedUsers.find(user =>
            user.username === username && user.password === password
        );

        if (matchedUser) {
            //Store login status and username
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("currentUser", matchedUser.username);
            alert("Successfully login!");
            window.location.reload();
        } else {
            alert("Incorrect username or password.");
        }
    });

    // Restore border color when user starts typing
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener("input", () => {
            input.style.borderColor = "#d7b789";
        });
    });
});
