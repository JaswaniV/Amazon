export let cart;

loadFromStorage(); // Jo hum  pehle kr rhe the bs usko function k through kr rhe h because we also needed that thing in cartTest.js

//SOlution of the mocking
export function loadFromStorage(){
  cart =JSON.parse(localStorage.getItem("cart"));

  if(!cart){
    cart=[
      {
        productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
        quantity: 1,
        deliveryOptionId: '1'
      }
    ];
  }
  }




export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId,quantity=1) /*Putting default quantity as 1 */ {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      /*Shortcut for the above code
      productId,
      quantity
       */
      deliveryOptionId:'1' //  L15 Choosing the default value initially when adding a new item to cart
    });
  }

  saveToStorage();
}


export function removeFromCart(productId){
  const newCart=[];
  cart.forEach( (cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  } );
  cart=newCart;
  saveToStorage();
}


//A14
export function CalculatecartQuantity(){
  let TotalQuantity = 0;
    cart.forEach( (cartItem) => {
      TotalQuantity += cartItem.quantity;
    });
    return TotalQuantity
}
// A14


//A14k
export function UpdatecartQuantity(productId,newQuantity){
  cart.forEach( (cartItem) => {
    if(cartItem.productId === productId){
      cartItem.quantity = newQuantity;
    }
  } );
  saveToStorage();
};



// l15
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  }); 

  matchingItem.deliveryOptionId = deliveryOptionId;

  //Saving to local Storage
  saveToStorage();
}