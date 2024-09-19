// Initialize cart from localStorage or as empty
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// Function to update cart count in the header
function updateCartCount() {
  const cartCount = Object.values(cart).reduce((acc, qty) => acc + qty, 0);
  document.getElementById('cart-count').textContent = cartCount;
}

// Function to add item to cart
function addToCart(productId) {
  if (cart[productId]) {
    cart[productId] += 1;
  } else {
    cart[productId] = 1;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Event listeners for "Add to Cart" buttons on the homepage
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute('data-product-id');
    addToCart(productId);
  });
});

// Update cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);
