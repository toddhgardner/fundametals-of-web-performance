/**
 * Frontend Script
 * Fundamentals of Web Performance
 *
 * These are the scripts for the frontend website. It contains options to call
 * both the RESTful and Bespoke APIs.
 *
 * It also contains some performance problems that we will explore and fix:
 * 1.
 */
window.addEventListener("DOMContentLoaded", async () => {

  const { user, cart, products } = await getDataRESTfully();

  /**
   * Initial update of the document with information from the API
   */
  renderCartCount(cart);
  renderCartContents(cart, products);

  /**
   * Attach Cart Click Handlers
   * We attache them to body because the buttons may be re-rendered during the
   * lifetime of the page.
   */
  document.body.addEventListener("click", async (evt) => {
    const el = evt.target;
    if (el.matches("button.add-to-cart")) {
      const productId = parseInt(el.getAttribute("data-product-id"), 10);
      updateAnalytics();
      await addToCart(user, productId);

      /**
       * TODO Performance Opportunity
       *
       * We do a lot of expensive work on the main thread in this handler, and
       * we don't provide much user feedback. This makes interactivity feel
       * sluggish.
       */
      // const productId = parseInt(el.getAttribute("data-product-id"), 10);
      // requestAnimationFrame(() => {
      //   el.textContent = "Added!";
      //   el.setAttribute("disabled", "disabled");
      // });
      // setTimeout(() => {
      //   updateAnalytics();
      // });
      // await addToCart(user, productId);
      // setTimeout(() => {
      //   el.textContent = "Add to Cart";
      //   el.removeAttribute("disabled");
      // }, 1500);
    }
    else if (el.matches("button.remove-from-cart")) {
      const cartItemId = el.getAttribute("data-cart-item-id");
      await removeFromCart(user, cartItemId, products);
    }
    else if (el.matches("button.clear-cart")) {
      await clearCart(user);
    }
  });

});

async function getCart(userId) {
  let resp = await fetch(`${API_BASE_URL}/api/users/${userId}/cart`)
  return await resp.json();
}

async function getProducts(userId) {
  let resp = await fetch(`${API_BASE_URL}/api/products?userId=${userId}`);
  return await resp.json();
}

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
    let userResp = await fetch(`${API_BASE_URL}/api/users/${userId}`);
    if (userResp.status !== 200) {
      // Our local user does not exist, clear it out.
      clearLocalUserId();
      return null;
    }
    let user = await userResp.json();
    saveLocalUserId(user.id);
    return user;
  }

  async function createUser(name) {
    let createUserResp = await fetch(`${API_BASE_URL}/api/users`, {
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
    saveLocalUserId(user.id);
    return user;
  }

  let user = await getUser() ?? await createUser("unknown");
  let cartTask = getCart(user.id);
  let productsTask = getProducts(user.id);

  return {
    user,
    cart: await cartTask,
    products: await productsTask
  };
}

/**
 * addToCart
 * Adds an item to the user's cart, then updates the UI.
 */
async function addToCart(user, productId) {
  const userId = user.id;
  const resp = await fetch(`${API_BASE_URL}/api/users/${userId}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, userId })
  });
  const cart = await resp.json();
  renderCartCount(cart);
}

/**
 * removeFromCart
 * Removes a cartItem from the user's cart, then updates the UI.
 */
async function removeFromCart(user, cartItemId, products) {
  const resp = await fetch(`${API_BASE_URL}/api/users/${user.id}/cart/${cartItemId}`, {
    method: "DELETE"
  });
  const cart = await resp.json();
  renderCartCount(cart);
  renderCartContents(cart, products);
}

/**
 * clearCart
 * Clears the entire user cart and updates the UI
 */
async function clearCart(user) {
  const userId = user.id
  const resp = await fetch(`${API_BASE_URL}/api/users/${userId}/cart`, {
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
function renderCartContents(cart, products) {
  const el = document.getElementById("cart-items");
  if (!el) { return; }

  el.innerHTML = "";
  cart.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    el.innerHTML = el.innerHTML + `
      <li class="product-card">
        <a href="/products/${product.slug}">
          <img src="${product.imagePath}" alt="${product.name}" />
          <h3>${product.name}</h3>
        </a>
        <div class="flex align-center">
          <button type="button" class="remove-from-cart" data-cart-item-id="${cartItem.id}">Remove</button>
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
 * updateAnalytics
 * Dummy function that simulates doing a lot of expensive work.
 */
function updateAnalytics() {
  performance.mark("analytics_start");
  const phantomEl = document.createElement("div");
  for (var i = 0; i <= 200_000; i++) {
    let child = document.createElement("div");
    child.textContent = i;
    phantomEl.appendChild(child);
  }
  performance.mark("analytics_end");
  performance.measure("analytics", "analytics_start", "analytics_end")
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
