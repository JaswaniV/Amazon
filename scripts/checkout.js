import {cart,removeFromCart, UpdatecartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';

TotalItems();

let cartSummaryHTML='';

cart.forEach( (cartItem) =>{
  let matchingProduct;

  products.forEach((product) => {
    if(product.id === cartItem.productId){
      matchingProduct = product;
    }
  });


  cartSummaryHTML+=`
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Wednesday, June 15
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                ${matchingProduct.price}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                Update  
                </span>

                <!-- A14g -->
                <input type="text" class="new-quantity-input js-new-quantity-input">
                <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>

                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>

            <div class="delivery-option">
                <input type="radio" class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio" class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    `

    
});

document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

//delete functionality
document.querySelectorAll('.js-delete-link').forEach( (link) => {
    link.addEventListener('click', () =>{
        const productId = link.dataset.productId;
        removeFromCart(productId);

        //removing that product from the checkout page
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        TotalItems();
    })
})



//A14 
//Update button functionallity
document.querySelectorAll('.js-update-quantity-link').forEach( (link) =>{
    link.addEventListener('click', () =>{
        const productId = link.dataset.productId;
        // console.log(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');

    })
} )


//A14j

//Save button functionality
document.querySelectorAll('.js-save-quantity-link').forEach( (link) =>{
    link.addEventListener('click', () =>{
        const productId = link.dataset.productId;

        const container = document.querySelector(`.js-cart-item-container-${link.dataset.productId}`);

        container.querySelector('.js-new-quantity-input').value;
        /* Here we are not using document because we dont'have to search the whole page 
        we are already found that container where we clicked save not we want the input field
        of that container/box only 
        */

        //update the cart data and quantity label on the page
        const newQuantity = parseInt(container.querySelector('.js-new-quantity-input').value);
        container.querySelector('.js-quantity-label').innerHTML=newQuantity;


        // validation
        if (newQuantity < 1 || newQuantity > 1000 || Number.isNaN(newQuantity)) {
        alert('Quantity must be between 1 and 1000');
        return;
        }
        UpdatecartQuantity(productId, newQuantity);


        //remove editing mode
        container.classList.remove('is-editing-quantity');

    })
})



//function for showing the total number of items
function TotalItems(){
    let totalItems=0;
    totalItems=cart.length;
    document.querySelector('.js-checkout-total-quantity').innerHTML=`${totalItems} item${totalItems!==1?'s':''}`;
}
