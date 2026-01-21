//Update the file paths as per new structure

import {cart,removeFromCart, UpdatecartQuantity,updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"; //L15
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js'; //l15 deliveryOptions

TotalItems();

// L15
// const today = dayjs();
// const delivery = today.add(7,'day');
// console.log(delivery);
// console.log(delivery.format('dddd, MMMM D'));
// L15




//L15
export function renderOrderSummary(){

    let cartSummaryHTML='';

    cart.forEach( (cartItem) =>{
    const matchingProduct = getProduct(cartItem.productId);

    //l15-deliveryOptions
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs()
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const dateString = deliveryDate.format(
    'dddd, MMMM D');

    //l15-deliveryOptions

    cartSummaryHTML+=`
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date js-delivery-date">
            Delivery date: ${dateString}
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
            <!--l15-deliveryOptions-->
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
    </div>
    </div>
    `;

    
    });




    //l15-deliveryOptions

    function deliveryOptionsHTML(matchingProduct, cartItem){
    let html='';
    deliveryOptions.forEach( (deliveryOption) => {
    const today = dayjs()
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const dateString = deliveryDate.format(
        'dddd, MMMM D');

    const priceString = deliveryOption.price
    ===0
        ? 'Free Shipping'
        : `Rs.${deliveryOption.price} -`;


        const isChecked =deliveryOption.id===cartItem.deliveryOptionId;


        html+=`
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" 
            ${isChecked ? 'checked' :''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                ${dateString}
            </div>
            <div class="delivery-option-price">
                ${priceString}  Shipping
            </div>
        </div>
        </div>
    `
        
    });
    return html;
    }








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



    // l15
    document.querySelectorAll('.js-delivery-option').
    forEach( (element) =>{
    element.addEventListener( 'click', () => {
        // const productId = element.dataset.productId;
        // const deliveryOptionId = element.dataset.deliveryOptionId;
        const {productId, deliveryOptionId} = element.dataset;//SHortcut for the above 2 lines
        updateDeliveryOption(productId, deliveryOptionId);



        //Updating the delivery date on the page Using DOM Manipulation

        // const container = document.querySelector(`.js-cart-item-container-${productId}`);
        // const dateElement = container.querySelector('.js-delivery-date');
        

        // let deliveryOption;

        // deliveryOptions.forEach( (option) => {
        //   if(option.id === deliveryOptionId){
        //     deliveryOption = option;
        //   }
        // });

        // const today = dayjs()
        // const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
        // const dateString = deliveryDate.format(
        //   'dddd, MMMM D');
        
        // dateElement.innerHTML=`Delivery date: ${dateString}`;

        //Updated the delivery date on the page Using DOM Manipulation

        renderOrderSummary();

    })
    });
}

/*Yha Pe jo renderOrderSummary tha that is being called in checkout.js becoz checkout.html is loading checkout.js

So instead of here we will export this function and import it in checkout.js and call it there
*/






//function for showing the total number of items
function TotalItems(){
    let totalItems=0;
    totalItems=cart.length;
    document.querySelector('.js-checkout-total-quantity').innerHTML=`${totalItems} item${totalItems!==1?'s':''}`;
}
