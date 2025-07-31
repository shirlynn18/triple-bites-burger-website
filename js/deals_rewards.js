function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalCount;
}

function showMessage(text, type = 'success') {
    const messageBox = document.getElementById('message');
    messageBox.querySelector('p').textContent = text;
    messageBox.className = 'message'; // Reset classes
    messageBox.classList.add('show', type);
    
    // Auto-hide message after 3 seconds
    setTimeout(() => messageBox.classList.remove('show'), 3000);
}

function addToCart(itemName, itemPrice, itemImage, isReward = false) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Prevent duplicate items
    const existingItem = cartItems.find(item => item.name === itemName);
    if (existingItem) {
        showMessage(`${itemName} is already in your cart!`, 'error');
        return false;
    }

    // Add new item to cart
    cartItems.push({
        id: Date.now().toString(),
        name: itemName,
        price: itemPrice,
        image: itemImage,
        quantity: 1,
        isReward: isReward
    });

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();

    // Show success message
    showMessage(isReward ? 
        `Successfully redeemed ${itemName}!` : 
        `${itemName} added to cart!`
    );
    
    return true;
}

// Main functionality
document.addEventListener('DOMContentLoaded', function () {
    // Initialize cart count
    updateCartCount();

    // Deals section setup
    // Add day indicators to deals
    document.querySelectorAll('.specials:first-child .deal').forEach(deal => {
        const heading = deal.querySelector('h3').textContent;
        const day = heading.split(' ')[0];

        const dayIndicator = document.createElement('div');
        dayIndicator.className = 'day-indicator';
        dayIndicator.textContent = `Available on ${day}`;
        deal.appendChild(dayIndicator);
    });

    // Rewards section setup
    // Mark rewards as redeemed if already in cart
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    document.querySelectorAll('.reward-section .deal').forEach(deal => {
        const itemName = deal.querySelector('.item_name').textContent;
        const isInCart = cartItems.some(item => item.name === itemName);

        if (isInCart) {
            const redeemedIndicator = document.createElement('div');
            redeemedIndicator.className = 'redeemed-indicator';
            redeemedIndicator.textContent = 'Redeemed';
            deal.appendChild(redeemedIndicator);

            const redeemButton = deal.querySelector('.redeem-btn');
            redeemButton.disabled = true;
            redeemButton.innerHTML = '<img src="images/check_icon.png" alt="Redeemed"> Redeemed';
        }
    });

    // Deal button handlers
    document.querySelectorAll('.specials:first-child .deal .add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation();

            const deal = this.closest('.deal');
            const heading = deal.querySelector('h3').textContent;
            const day = heading.split(' ')[0].toLowerCase();

            const validDays = ['monday', 'wednesday', 'friday', 'sunday'];
            const today = new Date().toLocaleString('en-US', { weekday: 'long' }).toLowerCase();

            // Validate day availability
            if (validDays.includes(day) && day === today) {
                const itemName = deal.querySelector('.item_name').textContent;
                const priceText = deal.querySelector('.item_price')?.textContent || '0';
                const itemPrice = parseFloat(priceText.replace(/[^\d.]/g, ''));
                const itemImage = deal.querySelector('img').src;

                addToCart(itemName, itemPrice, itemImage, false);
            } else {
                showMessage(
                    `This deal is only available on ${day.charAt(0).toUpperCase() + day.slice(1)}`,
                    'error'
                );
            }
        });
    });

    // Reward button handler
    document.querySelectorAll('.reward-section .redeem-btn').forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation();
            
            const deal = this.closest('.deal');
            const itemName = deal.querySelector('.item_name').textContent;
            const itemImage = deal.querySelector('img').src;
            
            // Check if reward already redeemed
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            if (cartItems.some(item => item.name === itemName)) {
                showMessage(`You've already redeemed ${itemName}!`, 'error');
                return;
            }
            
            // Add reward to cart
            const added = addToCart(itemName, 0, itemImage, true);
            
            if (added) {
                // Create redeemed indicator
                const redeemedIndicator = document.createElement('div');
                redeemedIndicator.className = 'redeemed-indicator';
                redeemedIndicator.textContent = 'Redeemed';
                deal.appendChild(redeemedIndicator);
                
                // Disable button
                this.disabled = true;
                this.innerHTML = '<img src="images/check_icon.png" alt="Redeemed"> Redeemed';
            }
        });
    });
});
