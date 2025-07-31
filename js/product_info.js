// Get Product ID from URL and Check Edit Mode
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

const isEditMode = new URLSearchParams(window.location.search).get("edit") === "true";
const editItem = JSON.parse(localStorage.getItem("editItem"));

// Load Product Details
function loadProduct() {
    const id = getProductIdFromURL();
    const product = products.find(p => p.id === id);

    if (!product) {
        alert("Product not found.");
        window.location.href = "menu.html";
        return;
    }

    document.querySelector(".product-image img").src = product.image;
    document.querySelector(".product-image img").alt = product.name;
    document.querySelector(".product-details h2").textContent = product.name;
    document.querySelector(".product-details .price").textContent = `RM ${product.price.toFixed(2)}`;
    document.querySelector(".product-details .ingredients").innerHTML = `Ingredients:<br>${product.ingredients}`;

    // Hide dropdown functionality for other categories
    const hideDropdowns = ["Fried Chicken", "Beverages", "Desserts", "Sides"].includes(product.category);
    const dropdowns = document.querySelectorAll(".dropdown");

    if (hideDropdowns) {
        dropdowns.forEach(drop => drop.style.display = "none");
    } else {
        dropdowns.forEach(drop => drop.style.display = "block");
    }

    // Generate Add-ons
    const addonsDropdown = document.querySelectorAll(".dropdown")[0].querySelector(".dropdown-body");
    addonsDropdown.innerHTML = "";
    if (product.addons) {
        product.addons.forEach(addon => {
            addonsDropdown.innerHTML += `
                <div class="check-box">
                    <span class="label">${addon.label}</span>
                    <span class="charge">(+RM ${addon.price.toFixed(2)})</span>
                    <div class="checkbox-wrap">
                        <input type="checkbox">
                        <div class="custom-checkbox"></div>
                    </div>
                </div>
            `;
        });
    }

    // Generate Removals
    const removalsDropdown = document.querySelectorAll(".dropdown")[1].querySelector(".dropdown-body");
    removalsDropdown.innerHTML = "";
    if (product.removals) {
        product.removals.forEach(item => {
            removalsDropdown.innerHTML += `
                <div class="check-box">
                    <span>${item}</span>
                    <div class="checkbox-wrap">
                        <input type="checkbox">
                        <div class="custom-checkbox"></div>
                    </div>
                </div>
            `;
        });
    }

    // If Edit Mode, Pre-fill Values
    if (isEditMode && editItem && editItem.id === product.id) {
        // Pre-select add-ons
        const addonBoxes = document.querySelectorAll(".dropdown")[0].querySelectorAll(".check-box");
        editItem.addons?.forEach(added => {
            addonBoxes.forEach(box => {
                const label = box.querySelector(".label")?.innerText;
                if (label === added.label) {
                    box.querySelector("input[type='checkbox']").checked = true;
                }
            });
        });

        // Pre-select removals
        const removalBoxes = document.querySelectorAll(".dropdown")[1].querySelectorAll(".check-box");
        editItem.removals?.forEach(removal => {
            removalBoxes.forEach(box => {
                const label = box.querySelector("span")?.innerText;
                if (label === removal) {
                    box.querySelector("input[type='checkbox']").checked = true;
                }
            });
        });

        // Set quantity
        const qtyInput = document.getElementById("quantity");
        if (qtyInput && editItem.quantity) {
            qtyInput.value = editItem.quantity;
            updateQty();
        }
    }
}

// Toggle Dropdown
function toggleDropdown(toggle) {
    const container = toggle.closest(".dropdown");
    container.classList.toggle("open");
}

// Quantity Control
const qty = document.getElementById('quantity');
const decBtn = document.getElementById('decrement-btn');
const incBtn = document.getElementById('increment-btn');

function decrement() {
    if (qty.value <= 1) {
        qty.value = 1;
    } else {
        qty.value = parseInt(qty.value) - 1;
    }

    updateQty();
}

function increment() {
    if (qty.value >= 5) {
        qty.value = 5;
    } else {
        qty.value = parseInt(qty.value) + 1;
    }

    updateQty();
}

function updateQty() {
    decBtn.disabled = qty.value <= 1;
    incBtn.disabled = qty.value >= 5;
}

updateQty();

// Show pop up message
function showMessage(text = "Item successfully added to cart!", color = "#28a745") {
    const message = document.getElementById("message");
    const messageText = message.querySelector("p");

    messageText.textContent = text;
    message.style.backgroundColor = color;

    message.classList.add("show");

    setTimeout(() => {
        message.classList.remove("show");
    }, 2500);
}

// Add to Cart / Save Edit
document.querySelector(".add-btn").addEventListener("click", () => {
    const id = getProductIdFromURL();
    const product = products.find(p => p.id === id);
    const quantity = parseInt(document.getElementById("quantity").value);

    const addOns = [];
    let addonsTotal = 0;

    document.querySelectorAll(".dropdown")[0].querySelectorAll(".check-box").forEach(box => {
        const checkbox = box.querySelector("input[type='checkbox']");
        if (checkbox.checked) {
            const label = box.querySelector(".label").innerText;
            const priceText = box.querySelector(".charge")?.innerText || "";
            const match = priceText.match(/([\d.]+)/);
            const price = match ? parseFloat(match[1]) : 0;
            addonsTotal += price;
            addOns.push({label, price});
        }
    });

    const removals = Array.from(document.querySelectorAll(".dropdown:nth-of-type(2) input[type='checkbox']:checked"))
        .map(cb => cb.closest(".check-box").querySelector("span").textContent);

    const totalPrice = (product.price + addonsTotal) * quantity;

    const cartItem = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity,
        addons: addOns,
        removals,
        totalPrice
    };

    let existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (isEditMode && editItem) {
        // Replace the item using its stored index (safer than comparing objects)
       if (typeof editItem.editIndex === "number" && existingCart[editItem.editIndex]) {
            existingCart[editItem.editIndex] = cartItem;
        } else {
            // fallback if index is missing
            existingCart = existingCart.map(item =>
                JSON.stringify(item) === JSON.stringify(editItem) ? cartItem : item
            );
        }
        localStorage.removeItem("editItem");
    } else {
        existingCart.push(cartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    showMessage();
    updateCartCount();

    setTimeout(() => {
        window.location.href = "cart.html";
    }, 300);
});

function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartCount = document.getElementById("cartCount");
    if (cartCount) {
        cartCount.textContent = cartItems.length;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadProduct();
    updateCartCount();

    if (isEditMode) {
        const btn = document.querySelector(".add-btn");
        if (btn) btn.textContent = "Update Cart";
    }
});
