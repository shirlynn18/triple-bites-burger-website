// Logo
const logo = document.getElementById('nav-logoIcon');
const profileBox = document.getElementById('nav-profileBox');

// Toggle visibility on logo click
logo.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent closing instantly
    profileBox.style.display = (profileBox.style.display === 'block') ? 'none' : 'block';
});

// Hide when clicking outside
document.addEventListener('click', (e) => {
    if (!profileBox.contains(e.target) && e.target !== logo) {
        profileBox.style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const floatingProfilePic = document.getElementById("nav-floatingProfilePic");
    const profileName = document.getElementById("nav-profileName");
    const profileId = document.getElementById("nav-profileId");

    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const currentUsername = localStorage.getItem("currentUser");
    const currentUser = users.find(user => user.username === currentUsername);

    if (currentUser) {
        // Update profile picture
        if (currentUser.profilePic && floatingProfilePic) {
            floatingProfilePic.src = currentUser.profilePic;
        }

        // Assign ID if not yet set
        if (!currentUser.id) {
            currentUser.id = "#" + String(users.indexOf(currentUser) + 1).padStart(4, "0");
            localStorage.setItem("registeredUsers", JSON.stringify(users));
        }

        // Display name and ID
        if (profileName) profileName.textContent = currentUser.username;
        if (profileId) profileId.textContent = "ID: " + currentUser.id;
    } else {
        // If no logged-in user found
        if (profileName) profileName.textContent = "Guest";
        if (profileId) profileId.textContent = "ID: N/A";
    }
});

// Logout 
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("nav-logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("currentUser");
            alert("You have been logged out.");
            window.location.href = "home.html";
        });
    }
});

// Responsive top nav bar 
function navFunction() {
    var x = document.getElementById("top-nav-r");

    if (x.className === "top-nav") {
        x.className += " responsive";
    } else {
        x.className = "top-nav";
    }
}

// Update the cart count
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartCount = document.getElementById("cartCount");
    if (cartCount) {
        cartCount.textContent = cartItems.length;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});
