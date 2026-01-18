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
      quantity: quantity
      /*Shortcut for the above code
      productId,
      quantity
       */
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