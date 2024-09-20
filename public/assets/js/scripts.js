/**
 * Frontend Scripts
 * Fundamentals of Web Performance
 *
 * These are the scripts for the frontend website. It contains options to call
 * both the RESTful and Bespoke APIs.
 *
 * It also contains some performance problems that we will explore and fix:
 * 1.
 */

const API_BASE_URL = "http://devstickers.localhost:3000/api";
// const API_BASE_URL = "http://api.devstickers.localhost:3001";

window.addEventListener("DOMContentLoaded", async () => {

  const { user, cart } = await getDataRESTfully();
  // const { user, cart } = await getDataQuickly();

  /**
   * Initial update of the document with information from the API
   */
  renderCartCount(cart);
  renderCartContents(cart);

  /**
   * Attach Cart Click Handlers
   * We attache them to body because the buttons may be re-rendered during the
   * lifetime of the page.
   */
  document.body.addEventListener("click", async (evt) => {
    const el = evt.target;
    if (el.matches("button.add-to-cart")) {
      const productId = el.getAttribute("data-product-id");
      const productTitle = el.getAttribute("data-product-title");

      el.textContent = "Added!";
      el.setAttribute("disabled", "disabled");
      setTimeout(() => {
        el.textContent = "Add to Cart";
        el.removeAttribute("disabled");
      }, 1500);

      await addToCart(user, productId, productTitle);
    }
    else if (el.matches("button.remove-from-cart")) {
      const cartItemId = el.getAttribute("data-cart-item-id");
      await removeFromCart(user, cartItemId);
    }
    else if (el.matches("button.clear-cart")) {
      await clearCart(user);
    }
  });

});

/**
 * RESTful pattern of getting data
 * Sequential calls for single entities.
 */
async function getDataRESTfully() {

  async function getUser() {
    let userId = getLocalUserId();
    if (!userId) {
      return null;
    }
    let userResp = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (userResp.status !== 200) {
      // Our local user does not exist, clear it out.
      clearLocalUserId(null);
      return null;
    }
    let user = await userResp.json();
    saveLocalUserId(user.userId);
    return user;
  }

  async function createUser(name) {
    let createUserResp = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    const location = createUserResp.headers.get("Location");
    if (!location || createUserResp.status !== 201) {
      throw new Error("Non RESTFUL Response");
    }

    let userResp = await fetch(location);
    let user = await userResp.json();
    saveLocalUserId(user.userId);
    return user;
  }

  async function getCartItems(userId) {
    let resp = await fetch(`${API_BASE_URL}/cart/${userId}`)
    return await resp.json();
  }

  let user = await getUser() ?? await createUser("unknown");
  let cart = await getCartItems(user.userId);
  return { user, cart };
}

/**
 * addToCart
 * Adds an item to the user's cart, then updates the UI.
 */
async function addToCart(user, productId, productTitle) {
  const resp = await fetch(`${API_BASE_URL}/cart/${user.userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, productTitle })
  });
  const cart = await resp.json();
  renderCartCount(cart);
}

/**
 * removeFromCart
 * Removes a cartItem from the user's cart, then updates the UI.
 */
async function removeFromCart(user, cartItemId) {
  const resp = await fetch(`${API_BASE_URL}/cart/${user.userId}/${cartItemId}`, {
    method: "DELETE"
  });
  const cart = await resp.json();
  renderCartCount(cart);
  renderCartContents(cart);
}

/**
 * clearCart
 * Clears the entire user cart and updates the UI
 */
async function clearCart(user) {
  const resp = await fetch(`${API_BASE_URL}/cart/${user.userId}`, {
    method: "DELETE"
  });
  const cart = await resp.json();
  renderCartCount(cart);
  renderCartContents(cart);
}

/**
 * renderCartContents
 * Client-side Rendering of the contents of the shopping cart from the API. Only
 * works with the presence of a #cart-items element.
 */
function renderCartContents(cart) {
  const el = document.getElementById("cart-items");
  if (!el) { return; }

  el.innerHTML = "";
  cart.forEach((cartItem) => {
    el.innerHTML = el.innerHTML + `
      <li class="product-card">
        <a href="/products/${cartItem.productId}">
          <img src="/assets/img/${cartItem.productId}.png" alt="${cartItem.productTitle}" />
          <h3>${cartItem.productTitle}</h3>
        </a>
        <div class="flex align-center">
          <button type="button" class="remove-from-cart" data-cart-item-id="${cartItem.cartItemId}">Remove</button>
        </div>
      </li>`;
  })
}

/**
 * renderCartCount
 * Client-side rendering of the number of items in the shopping cart in the header.
 */
function renderCartCount(cart) {
  document.getElementById('cart-count').textContent = cart.length;
}

/**
 * Utility helper functions
 */
function getLocalUserId() {
  return localStorage.getItem("userId");
}
function saveLocalUserId(userId) {
  localStorage.setItem("userId", userId);
}
function clearLocalUserId() {
  localStorage.removeItem("userId");
}