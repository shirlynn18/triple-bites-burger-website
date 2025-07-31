document.addEventListener("DOMContentLoaded", () => {
    //Get form and input fields
    const form = document.querySelector("#signup-form");

    const usernameInput = document.getElementById("signup-username");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("password");

    const allInputs = [usernameInput, emailInput, phoneInput, passwordInput];

    //Load existing users or fallback to empty array
    let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    
    // Auto-fill +60 when phone input gets focus
    const prefix = "+60-";
    phoneInput.addEventListener("focus", () => {
        if (phoneInput.value === "") {
            phoneInput.value = prefix;
            phoneInput.setSelectionRange(prefix.length, prefix.length);
        }
    });

    //Prevent cursor from moving into the prefix
    phoneInput.addEventListener("keydown", (e) => {
        const pos = phoneInput.selectionStart;
        if (
            (e.key === "Backspace" && pos <= prefix.length) ||
            (e.key === "Delete" && pos < prefix.length) ||
            (e.key === "ArrowLeft" && pos <= prefix.length) ||
            e.key === "Home"
        ) {
            e.preventDefault();
            phoneInput.setSelectionRange(prefix.length, prefix.length);
        }
    });

    // Restrict input to only numbers after the "+60-" prefix
    phoneInput.addEventListener("input", () => {
        const raw = phoneInput.value;

        if (!raw.startsWith(prefix)) {
            phoneInput.value = prefix;
            return;
        }

        // Remove all non-digit characters after prefix
        const digitsOnly = raw.slice(prefix.length).replace(/\D/g, "");
        phoneInput.value = prefix + digitsOnly;
    });

    //Utility functions for showing and clearing validation errors
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

    //Regular expressions for validations
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    const phoneRegex = /^\+60-\d{8,10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Instant validation on input
    allInputs.forEach(input => {
        input.addEventListener("input", () => {
            const value = input.value.trim();

            if (input === usernameInput) {
                if (value.length === 0) {
                    showError(input, "Username is required");
                } else if (users.some(user => user.username === value)) {
                    showError(input, "Username already taken");
                } else {
                    clearError(input);
                }
            }

            if (input === emailInput) {
                if (value.length === 0) {
                    showError(input, "Email is required");
                } else if (!emailRegex.test(value)) {
                    showError(input, "Use a valid Gmail address");
                } else if (users.some(user => user.email === value)) {
                    showError(input, "Email already registered");
                } else {
                    clearError(input);
                }
            }

            if (input === phoneInput) {
                const digitsOnly = value.slice(prefix.length);

                if (digitsOnly.length === 0) {
                    showError(input, "Phone number is required");
                } else if (!/^\d+$/.test(digitsOnly)) {
                    showError(input, "Only digits allowed after +60-");
                } else if (digitsOnly.length < 8 || digitsOnly.length > 10) {
                    showError(input, "Enter 8–10 digits after +60-");
                } else if (users.some(user => user.phone === value)) {
                    showError(input, "Phone number already used");
                } else {
                    clearError(input);
                }
            }

            if (input === passwordInput) {
                if (value.length === 0) {
                    showError(input, "Password is required");
                } else if (!passwordRegex.test(value)) {
                    showError(input, "Min 8 chars, include letters & numbers");
                } else {
                    clearError(input);
                }
            }
        });
    });

    //Form submission handler
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !email || !phone || !password) {
            alert("Please fill in all fields.");
            return;
        }

        let hasError = false;

        //Final validation before submit
        //Username validation
        if (username === "") {
            showError(usernameInput, "Username is required");
            hasError = true;
        } else if (users.some(user => user.username === username)) {
            showError(usernameInput, "Username already taken");
            hasError = true;
        } else {
            clearError(usernameInput);
        }

        //Email validation
        if (email === "") {
            showError(emailInput, "Email is required");
            hasError = true;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, "Use a valid Gmail address");
            hasError = true;
        } else if (users.some(user => user.email === email)) {
            showError(emailInput, "Email already registered");
            hasError = true;
        } else {
            clearError(emailInput);
        }

        // Phone validation
        if (phone.length === 0 || phone === prefix) {
            showError(phoneInput, "Phone number is required");
            hasError = true;
        } else if (!phoneRegex.test(phone)) {
            showError(phoneInput, "Enter 8-10 digits after +60-");
            hasError = true;
        } else if (users.some(user => user.phone === phone)) {
            showError(phoneInput, "Phone number already used");
            hasError = true;
        } else {
            clearError(phoneInput);
        }

        // Password validation
        if (password === "") {
            showError(passwordInput, "Password is required");
            hasError = true;
        } else if (!passwordRegex.test(password)) {
            showError(passwordInput, "Min 8 chars, include letters & numbers");
            hasError = true;
        } else {
            clearError(passwordInput);
        }

        // Stop signup if any error
        if (hasError) {
            alert("Signup failed: Some inputs are invalid.");
            return;
        }

        //Save user with padded ID
        const nextId = users.length + 1;
        const newUser = {
            id: "#" + String(nextId).padStart(4, "0"),
            username, email, phone, password
        };

        users.push(newUser);
        localStorage.setItem("registeredUsers", JSON.stringify(users));
        localStorage.setItem("currentUser", username);

        alert("Signup successful! You can now log in.");

        //Show login modal 
        document.getElementById("signupFormContainer").style.display = "none";
        document.getElementById("loginFormContainer").style.display = "block";
    });
});
