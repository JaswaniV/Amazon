export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  },
  {
    productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
    quantity: 1,
    deliveryOptionId: '2'
  }
];

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