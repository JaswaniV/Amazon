// The product array is inside data/products.js file which is linked to amazon.html file
// It will load that product array and then we will be using that here

import { cart, addToCart, CalculatecartQuantity} from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        Rs.${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});


/*
Putting all the html generated above onto the page

    all our html for the products are inside the div with class "products-grid"
 */
document.querySelector(".js-products-grid").innerHTML = productsHTML;



// A14
let cq = CalculatecartQuantity();
document.querySelector('.js-cart-quantity').innerHTML = cq;
// A14
 


const timeoutIds = {};

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    //Shortcut for the above code
    //const {productId} = button.dataset;


    //Get selected quantity from dropdown
    let quantity = parseInt(document.querySelector(`.js-quantity-selector-${productId}`).value);
      // console.log(quantity);

    addToCart(productId, quantity);


    //calculating cart quantity and updating it on the page
    const cart_Quantity = CalculatecartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML = cart_Quantity; 

    

    // Show "Added" message
    const addedMSG = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMSG.classList.add("added-to-cart-visible");

    // Clear old timeout if it exists for this product
    if (timeoutIds[productId]) {
      clearTimeout(timeoutIds[productId]);
    }

    // Start new timeout to hide the message after 2 seconds
    timeoutIds[productId] = setTimeout(() => {
      addedMSG.classList.remove("added-to-cart-visible");
    }, 2000);
  });
});

