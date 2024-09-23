document.addEventListener('DOMContentLoaded', () => {
    // Load cart from local storage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to update cart summary
    function updateCartSummary() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        
        document.getElementById('total-items').innerText = totalItems;
        document.getElementById('total-price').innerText = `$${totalPrice.toFixed(2)}`;
    }

    // Event listener for Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productItem = button.closest('.product-item');
            const productId = productItem.getAttribute('data-id');
            const productName = productItem.getAttribute('data-name');
            const productPrice = parseFloat(productItem.getAttribute('data-price'));

            const existingProduct = cart.find(item => item.id === productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${productName} has been added to your cart!`);
            updateCartSummary();
        });
    });

    // Event listener for Remove buttons in the cart
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cartItem = button.closest('.cart-item');
            const productId = cartItem.getAttribute('data-id');

            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            cartItem.remove();
            updateCartSummary();
        });
    });

    // Initialize the cart summary if on the cart page
    if (document.querySelector('.cart-section')) {
        updateCartSummary();
    }
});
