 
 document.addEventListener("DOMContentLoaded", () => {
            // Cart state storage
            let cartData = [];

            // DOM Selectors
            const badgeCounter = document.getElementById("cart-counter");
            const allBuyButtons = document.querySelectorAll(".buy-btn");
            const cartDrawer = document.getElementById("cart-drawer");
            const cartOverlay = document.getElementById("cart-overlay");
            const openCartTrigger = document.getElementById("open-cart-trigger");
            const closeCartTrigger = document.getElementById("close-cart-trigger");
            const cartItemsContainer = document.getElementById("cart-items-container");
            const cartTotalAmount = document.getElementById("cart-total-amount");
            const payNowBtn = document.getElementById("pay-now-btn");

            // --- FUNCTION: Open / Close Side Cart Panel ---
            function toggleCartPanel(open = true) {
                if (open) {
                    cartDrawer.classList.add("active");
                    cartOverlay.classList.add("active");
                } else {
                    cartDrawer.classList.remove("active");
                    cartOverlay.classList.remove("active");
                }
            }

            openCartTrigger.addEventListener("click", () => toggleCartPanel(true));
            closeCartTrigger.addEventListener("click", () => toggleCartPanel(false));
            cartOverlay.addEventListener("click", () => toggleCartPanel(false));

            // --- FUNCTION: Update UI View Elements ---
            function updateCartUI() {
                // 1. Update Badge Number Counter
                badgeCounter.innerText = cartData.length;

                // 2. Render List Rows
                if (cartData.length === 0) {
                    cartItemsContainer.innerHTML = `<div class="empty-cart-msg">Your cart is completely empty</div>`;
                    cartTotalAmount.innerText = "$0.00";
                    payNowBtn.disabled = true;
                    return;
                }

                let itemsHTML = "";
                let accumulatedTotal = 0;

                cartData.forEach(item => {
                    accumulatedTotal += item.price;
                    itemsHTML += `
                        <div class="cart-item-row">
                            <img class="cart-item-img" src="${item.image}" alt="${item.name}">
                            <div class="cart-item-details">
                                <h4 class="cart-item-title">${item.name}</h4>
                                <span class="cart-item-time"><i class="fa-regular fa-clock"></i> Added at ${item.timeAdded}</span>
                                <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                            </div>
                        </div>
                    `;
                });

                cartItemsContainer.innerHTML = itemsHTML;
                cartTotalAmount.innerText = `$${accumulatedTotal.toFixed(2)}`;
                payNowBtn.disabled = false;
            }

            // --- EVENT: Click Add To Cart Button ---
            allBuyButtons.forEach(button => {
                button.addEventListener("click", (e) => {
                    // Navigate up structural DOM node tree to grab parent details info dynamically
                    const targetCard = e.target.closest(".product-card");
                    const pName = targetCard.querySelector(".product-name").innerText;
                    const pImgSrc = targetCard.querySelector(".product-image").getAttribute("src");
                    
                    // Parse clean float value string value stripping '$' symbol
                    const pPriceRaw = targetCard.querySelector(".current-price").innerText;
                    const pPriceParsed = parseFloat(pPriceRaw.replace(/[^0-9.]/g, ''));

                    // Formulate premium local timestamp value string
                    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

                    // Append object element dataset array layer configuration state
                    cartData.push({
                        name: pName,
                        image: pImgSrc,
                        price: pPriceParsed,
                        timeAdded: timestamp
                    });

                    // Update layouts
                    updateCartUI();

                    // Micro-Animation Feedback Trigger loop on badge bubble layer
                    badgeCounter.style.transform = "scale(1.3)";
                    setTimeout(() => { badgeCounter.style.transform = "scale(1)"; }, 200);
                });
            });

            // --- EVENT: Checkout Action Pay Button ---
            payNowBtn.addEventListener("click", () => {
                alert("Successfully Paid! Thank you for shopping with Faolany Beauty.");
                
                // Reset State and close layout panel elements
                cartData = [];
                updateCartUI();
                toggleCartPanel(false);
            });
        });