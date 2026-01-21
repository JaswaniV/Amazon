export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId,quantity) {
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