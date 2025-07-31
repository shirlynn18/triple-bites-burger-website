function toggleSidebar() {
    const sidebar = document.querySelector('.menu-sidebar');
    const sidebarBtn = document.querySelector('.sidebar-btn');

    sidebar.classList.toggle('active');
    sidebarBtn.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const highlightId = urlParams.get("highlight");

    if (highlightId) {
        // Wait until the burger cards are fully loaded
        setTimeout(() => {
            const targetCard = document.querySelector(`a[href="product_info.html?id=${highlightId}"]`)?.closest(".product-card");
            if (targetCard) {
                targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
                targetCard.classList.add("highlight-pulse");

                // Remove highlight after a few seconds
                setTimeout(() => {
                    targetCard.classList.remove("highlight-pulse");
                }, 3000);
            }
        }, 300); // slight delay in case content loads slowly
    }
});
