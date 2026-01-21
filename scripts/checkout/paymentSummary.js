import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { cart } from "../../data/cart.js";
export function renderPaymentSummary(){
    let productsPrice=0;
    let finalQuantity=0;
    cart.forEach( (cartItem) =>{
        const matchingProduct = getProduct(cartItem.productId);
        productsPrice += matchingProduct.price * cartItem.quantity;
        finalQuantity += cartItem.quantity;
    })


    let shippingPrice=0;
    cart.forEach( (cartItem) => {
        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);
        shippingPrice += deliveryOption.price;

    })

    const totalPrice = productsPrice + 
    shippingPrice; 

    const paymentSummaryHTML=`
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${finalQuantity}):</div>
            <div class="payment-summary-money">$Rs.${formatCurrency(productsPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">Rs.${formatCurrency(shippingPrice)}</div>
          </div>


          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">Rs.${formatCurrency(totalPrice)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;

}

function formatCurrency(price) {
  return (price).toFixed(2);
}
