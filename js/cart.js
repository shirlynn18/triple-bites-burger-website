// Load cart items, handle modals & auto-fill delivery
document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".cart-wrapper");
    const cartBarTotal = document.querySelector(".cart-bar span");
    const cartData = JSON.parse(localStorage.getItem("cartItems")) || [];

    function formatAddOns(addons) {
        if (addons && addons.length > 0) {
            const result = addons.map(a => {
                if (typeof a === "object" && a.label && a.price !== undefined) {
                    return `*${a.label} (+RM ${parseFloat(a.price).toFixed(2)})`;
                } else if (typeof a === "string") {
                    return `*${a}`;
                } else {
                    return "";
                }
            }).join("<br>");

            return result;
        } else {
            return "";
        }
    }

    function formatRemovals(removals) {
        return removals && removals.length > 0
            ? `<br>*${removals.join("<br>*")}`
            : "";
    }

    function renderCart() {
        const cartSection = document.createElement("div");
        cartSection.className = "cart_section";

        cartContainer.innerHTML = "";
        cartContainer.appendChild(cartSection);

        if (cartData.length === 0) {
            cartSection.innerHTML = `<p style="text-align:center; font-weight:bold; padding: 2rem;">Your cart is empty.</p>`;
            cartBarTotal.textContent = "TOTAL: RM 0.00";
            document.querySelector(".order-btn").disabled = true;
            document.querySelector(".order-btn").classList.add("disabled");
        } else {
            cartData.forEach((item, index) => {
                const div = document.createElement("div");
                div.className = "cart-item";
                div.innerHTML = `
                    <div class="item-info">
                        <div class="item-img">
                            <img src="${item.image}" alt="${item.name}">
                        </div>

                        <div class="item-details">
                            <p class="item-name">${item.name}</p>
                            <span class="price-tag">RM ${(item.totalPrice || (item.price * item.quantity)).toFixed(2)}</span>
                            <p class="description">
                                ${formatAddOns(item.addons)}
                                ${formatRemovals(item.removals)}<br>
                                Quantity: ${item.quantity}
                            </p>
                        </div>
                    </div>

                    <div class="item-btn">
                        <a class="edit-btn" href="#" data-index="${index}">Edit</a>
                        <a class="remove-btn" href="#" data-index="${index}">Remove</a>
                    </div>
                    <hr>
                `;
                cartSection.appendChild(div);
            });

            cartBarTotal.textContent = `TOTAL: RM ${calculateTotal(cartData)}`;
        }

        renderOrderHistory();
    }

    function renderOrderHistory() {
        const currentUser = localStorage.getItem("currentUser");
        const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
        const userOrders = history.filter(o => o.username === currentUser);

        if (userOrders.length === 0) return;

        const wrapper = document.createElement("div");
        wrapper.className = "past-orders";

        wrapper.innerHTML = `
            <hr class="cart-history-divider">
            <button id="toggleOrderHistory" class="toggle-btn">Show Past Orders ▼</button>
            <div id="orderHistoryContent" style="display:none;"></div>
        `;

        const orderContent = wrapper.querySelector("#orderHistoryContent");

        userOrders.reverse().forEach(order => {
            const orderDiv = document.createElement("div");
            orderDiv.className = "order-block";
            orderDiv.innerHTML = `
                <div class="order-info">
                    <p><strong>Order ID:</strong> ${order.orderId}</p>
                    <p><strong>Date:</strong> ${order.date}</p>
                    <p><strong>Method:</strong> ${order.method}</p>
                    <p><strong>Payment:</strong> ${order.payment}</p>
                    <p><strong>Status:</strong> ${order.status}</p>
                </div>
            `;

            const itemList = document.createElement("div");
            itemList.className = "order_items";

            order.items.forEach(item => {
                itemList.innerHTML += `
                    <div class="cart-item">
                        <div class="item-info">
                            <div class="item-img">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            
                            <div class="item-details">
                                <p class="item-name">${item.name}</p>
                                <span class="price-tag">RM ${(item.totalPrice || (item.price * item.quantity)).toFixed(2)}</span>
                                <p class="description">
                                    ${formatAddOns(item.addons)}
                                    ${formatRemovals(item.removals)}<br>
                                    Quantity: ${item.quantity}
                                </p>
                            </div>
                        </div>
                    </div>
                `;
            });

            orderDiv.appendChild(itemList);
            orderContent.appendChild(orderDiv);
        });

        // Append the whole wrapper to the cart
        cartContainer.appendChild(wrapper);

        // Toggle functionality
        wrapper.querySelector("#toggleOrderHistory").addEventListener("click", () => {
            const content = wrapper.querySelector("#orderHistoryContent");
            const isVisible = content.style.display === "block";
            content.style.display = isVisible ? "none" : "block";
            wrapper.querySelector("#toggleOrderHistory").textContent = isVisible
                ? "Show Past Orders ▼"
                : "Hide Past Orders ▲";
        });
    }

    cartContainer.addEventListener("click", (e) => {
        // Remove item
        if (e.target.classList.contains("remove-btn")) {
            e.preventDefault();
            const index = e.target.getAttribute("data-index");
            cartData.splice(index, 1);
            localStorage.setItem("cartItems", JSON.stringify(cartData));
            renderCart();
            updateCartCount();
            show_message("Item removed from cart!", "#dc3545");
        }  

        // Edit item
        if (e.target.classList.contains("edit-btn")) {
            e.preventDefault();
            const index = parseInt(e.target.getAttribute("data-index"));
            const itemToEdit = cartData[index];
            itemToEdit.editIndex = index;
            localStorage.setItem("editItem", JSON.stringify(itemToEdit));
            window.location.href = `product_info.html?id=${itemToEdit.id}&edit=true`;

        }
    });

    renderCart();

    // Autofill delivery modal with account data
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const currentUser = localStorage.getItem("currentUser");
    const userData = users.find(u => u.username === currentUser);

    if (userData) {
        document.getElementById("name").value = userData.username;
        document.getElementById("address1").value = userData.address1 || "";
        document.getElementById("address2").value = userData.address2 || "";
        document.getElementById("city").value = userData.city || "";
        document.getElementById("state").value = userData.state || "";
        document.getElementById("postcode").value = userData.postcode || "";
    }
});

function calculateTotal(cart) {
    return cart.reduce((total, item) => total + (item.totalPrice || (item.price * item.quantity)), 0).toFixed(2);
}

function show_message(text = "Item updated!", bg = "#28a745") {
    const messageBox = document.getElementById("message");
    const messageText = messageBox.querySelector("p");

    if (!messageBox || !messageText) return; // stop if HTML missing

    messageText.textContent = text;
    messageBox.style.backgroundColor = bg;

    messageBox.classList.add("show");

    setTimeout(() => {
        messageBox.classList.remove("show");
    }, 2500);
}

// Modal functions
function open_modal() {
    document.getElementById('method').style.display = 'flex';
}

function close_modal() {
    document.getElementById('method').style.display = 'none';
    document.getElementById('for_pickup').style.display = 'none';
    document.getElementById('for_delivery').style.display = 'none';
}

function selectOption(option) {
    close_modal();

    if (option === 'pickup') {
        document.getElementById('for_pickup').style.display = 'flex';
    } else if (option === 'delivery') {
        document.getElementById('for_delivery').style.display = 'flex';

        const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        const currentUser = localStorage.getItem("currentUser");
        const userData = users.find(u => u.username === currentUser);

        if (userData) {
            document.getElementById("name").value = userData.username;
            document.getElementById("address1").value = userData.address1 || "";
            document.getElementById("address2").value = userData.address2 || "";
            document.getElementById("city").value = userData.city || "";
            document.getElementById("state").value = userData.state || "";
            document.getElementById("postcode").value = userData.postcode || "";
        }
    }
}

function go_back() {
    document.getElementById('method').style.display = 'flex';
    document.getElementById('for_pickup').style.display = 'none';
    document.getElementById('for_delivery').style.display = 'none';
}

document.getElementById("confirmPickupOrder").addEventListener("click", () => {
    const storeSelect = document.getElementById("store");
    const paymentSelect = document.getElementById("payment_pickup");

    const store = storeSelect.options[storeSelect.selectedIndex].text;
    const payment = paymentSelect.options[paymentSelect.selectedIndex].text;

    if (storeSelect.value === "") {
        alert("Please select a store location.");
        return;
    }

    if (paymentSelect.value === "") {
        alert("Please select a payment method.");
        return;
    }

    const isConfirmed = confirm(`You selected:\nStore: ${store}\nPayment: ${payment}\n\nConfirm order?`);
    if (!isConfirmed) return;

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const currentUser = localStorage.getItem("currentUser");

    const order = {
        orderId: "TB" + Date.now(),
        username: currentUser,
        items: cartItems,
        method: "Pickup",
        payment: payment,
        total: calculateTotal(cartItems),
        date: new Date().toLocaleString(),
        status: "Preparing"
    };

    saveOrderToHistory(order); //Save before removing cart
    localStorage.removeItem("cartItems");

    alert("Order Placed Successfully!");

    setTimeout(() => {
        window.location.href = "cart.html";
    }, 100);
});

// Confirm order
function confirmOrder() {
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const currentUser = localStorage.getItem("currentUser");
    const userData = users.find(u => u.username === currentUser);

    if (!userData) {
        alert("User not found.");
        return;
    }

    // Get and validate delivery inputs
    const address1 = document.getElementById("address1")?.value.trim();
    const address2 = document.getElementById("address2")?.value.trim();
    const city = document.getElementById("city")?.value.trim();
    const state = document.getElementById("state")?.value.trim();
    const postcode = document.getElementById("postcode")?.value.trim();
    const paymentSelect = document.getElementById("payment_delivery");
    const payment = paymentSelect?.value;

    if (!payment || payment === "") {
        alert("Please select a payment method.");
        return;
    }

    // Validate required fields
    if (!address1 || !address2 || !city || !state || !postcode || !payment) {
        alert("Please fill in all required fields including payment method.");
        return;
    }

    // Format address text
    const addressText = `${address1}\n${address2}\n${city}, ${state} ${postcode}`;

    const isConfirmed = confirm(`Please confirm your delivery address:\n\n${addressText}\n\nPayment Method: ${payment}`);
    if (!isConfirmed) return;

    // Update address to account
    userData.address1 = address1;
    userData.address2 = address2;
    userData.city = city;
    userData.state = state;
    userData.postcode = postcode;

    const updatedUsers = users.map(u => u.username === currentUser ? userData : u);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const order = {
        orderId: "TB" + Date.now(),
        username: currentUser,
        items: cartItems,
        method: "Delivery",
        payment: payment,
        total: calculateTotal(cartItems),
        date: new Date().toLocaleString(),
        status: "Preparing"
    };

    saveOrderToHistory(order); // Save before clearing cart

    // Clear cart
    localStorage.removeItem("cartItems");

    alert("Order Placed Successfully!");

    setTimeout(() => {
        window.location.href = "cart.html";
    }, 100);
}

document.getElementById("confirmOrder").addEventListener("click", confirmOrder);

function saveOrderToHistory(order) {
    const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
    history.push(order);
    localStorage.setItem("orderHistory", JSON.stringify(history));
}
