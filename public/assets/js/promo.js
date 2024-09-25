/**
 * Promo Banner
 * Fundamentals of Web Performance
 *
 * Example add-on script that gets the promoted products for the store and
 * renders a promotional banner. This demonstrates:
 *
 * 1. Unnecessary render delay
 * 2. Downloading resources that are not shown
 * 3. Shifting layouts
 */
window.addEventListener("DOMContentLoaded", async () => {

  const productsResp = await fetch(`${API_BASE_URL}/api/products`);
  const products = await productsResp.json();

  const el = document.getElementById("promo-banner");

  let innerHTML = "<div class='container'><div class='promo-list flex-column'>"
  products.forEach((product) => {
    innerHTML += `
      <div class="product-card ${product.isPromo ? 'promo' : ''}">
        <a href="/products/${product.slug}">
          <img src="${STATIC_BASE_URL}${product.imagePath}?promo" alt="${product.name}" ${product.isPromo ? 'onload="showPromo()"' : ''} />
          <div class="product-copy flex-column">
            <h2>Flash Sale!!</h2>
            <h3>${product.name}</h3>
          </div>
        </a>
        <div class="flex align-center">
          <button type="button" class="add-to-cart btn-inverse btn-big" data-product-id="${product.id}">Add to Cart</button>
        </div>
      </div>`;
  });
  innerHTML += "</div>"
  innerHTML += "</div>";
  el.innerHTML = innerHTML;

  // expand the promoted product
  window.showPromo = function () {
    setTimeout(() => {
      el.querySelector(".product-card.promo").classList.add("expand");
    }, 2000);
  }

});
