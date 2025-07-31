let isLoggedIn = false;

//Open the login/signup modal
function openModal(type = "login") {
    const modal = document.getElementById("popupModal");
    const loginForm = document.getElementById("loginFormContainer");
    const signupForm = document.getElementById("signupFormContainer");

    if (modal) modal.style.display = "flex";

    //Show login/signup form based on argument
    if (type === "login") {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    } else if (type === "signup") {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    }
}

//Close the login/signup modal
function closeModal() {
    const modal = document.getElementById("popupModal");
    modal.style.display = "none";
}

//Switch to signup form
function showSignupForm() {
    openModal("signup");
}

//Switch to login form
function showLoginForm() {
    openModal("login");
}

document.addEventListener("DOMContentLoaded", () => {
    //Check login status from localStorage
    const alreadyLoggedIn = localStorage.getItem("loggedIn") === "true";
    isLoggedIn = alreadyLoggedIn;

    //If not loggedin, show login modal again on page load
    if (!isLoggedIn) {
        openModal("login");
    }

    // Handle login form submission
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("login-username").value;
            const password = document.getElementById("login-password").value;
            
            //Fetch registered users 
            const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
            const user = registeredUsers.find(u => u.username === username && u.password === password);

            if (user) {
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("currentUser", username);
                isLoggedIn = true;
                closeModal();
            } else {
                alert("Invalid username or password.");
                isLoggedIn = false;
            }
        });
    }

    // Intercepts all clicks outside the modal if not logged in
    document.body.addEventListener("click", function (e) {
        if (isLoggedIn) return;

        const target = e.target;

        // Allow interaction inside the modal
        if (
            target.closest("#popupModal") ||
            target.closest(".modal-link") ||
            target.closest("#login-form") ||
            target.closest("#signup-form")
        ) {
            return;
        }

        //Prevent click outside modal and force login 
        e.preventDefault();
        e.stopPropagation();
        openModal("login");
    }, true);

    // Manual login/signup modal link click handler
    document.querySelectorAll("a.modal-link").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const href = this.getAttribute("href");
            if (href.includes("signup")) {
                openModal("signup");
            } else {
                openModal("login");
            }
        });
    });

    // Initialize burger display
    updateBurger(0);
});

// Burger list data
const burgers = [
    {
      title: "Sunny Stack Burger",
      description: "Start your day right with our hearty breakfast burger packed with a golden fried egg, crispy bacon, and juicy sausage—all stacked between our signature buns. Morning bliss in every bite!",
      price: "RM14.99",
      img: "images/new_sunny.png"
    },

    {
      title: 'Blazing Triple Bites',
      description: 'Turn up the heat with this fiery triple-layered burger loaded with spicy sauce, jalapeños, and a perfectly grilled beef patty. It\'s a lava explosion of flavor that spice lovers won\'t resist.',
      price: "RM16.99",
      img: 'images/new_spicy.png',
    },
    
    {
      title: "Vegan Delight Burger",
      description: "Wholesome and 100% plant-powered, this vegan burger features a savory mushroom-based sausage, fresh lettuce, and our special vegan sauce. Guilt-free, flavor-full delight in every bite!",
      price: "RM15.99",
      img: "images/new_vegan.png"
    }
];

let selectedIndex = 0;

//New Burgers Release Section
//Updates the burger display content based on index
function updateBurger(index) {
    const burger = burgers[index];
    document.getElementById('burger-title').textContent = burger.title;
    document.getElementById('burger-description').textContent = burger.description;
    document.getElementById('burger-price').textContent = burger.price;
    document.querySelector('.burger-display img').src = burger.img;

    //Highlight the selected burger icon
    document.querySelectorAll('.burger-icons img').forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

//Preview burger on hover
function previewBurger(index) {
    updateBurger(index);
}

//Show burger and scroll to section on click
function showBurger(index) {
    selectedIndex = index;
    updateBurger(index);
    document.getElementById('new-burgers').scrollIntoView({ behavior: 'smooth' });
}

//Go to detailed burger view page
function viewBurger() {
    const ids = ["burger1", "burger2", "burger3"];
    const burgerId = ids[selectedIndex];
    window.location.href = `menu.html?highlight=${burgerId}`;
}

//Add selected burger to cart and go to product_info.html
function addToCart() {
    const ids = ["burger1", "burger2", "burger3"];
    const burgerId = ids[selectedIndex];
    window.location.href = `product_info.html?id=${burgerId}`;
}
