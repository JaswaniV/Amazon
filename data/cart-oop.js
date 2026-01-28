//L17-1
function Cart(localStorageKey){
  const cart ={
      cartItems:undefined,

      loadFromStorage(){
        this.cartItems =JSON.parse(localStorage.getItem(localStorageKey)); //This was renamed because our cart.js code also stores from ls.getItem(cart) 

        if(!this.cartItems){
          this.cartItems=[
          {
              productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
              quantity: 1,
              deliveryOptionId: '1'
          }
          ];
        }
      },

      saveToStorage(){
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
      },

      

      addToCart(productId,quantity=1){
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
          if (cartItem.productId === productId) {
            matchingItem = cartItem;
          }
        });

        if (matchingItem) {
          matchingItem.quantity += quantity;
        } 
        else {
          this.cartItems.push({
          productId: productId,
          quantity: quantity,
          /*Shortcut for the above code
          productId,
          quantity
          */
          deliveryOptionId:'1' //  L15 Choosing the default value initially when adding a new item to cart
          });
        }

        this.saveToStorage();
      },

      removeFromCart(productId){
        const newCart=[];
        this.cartItems.forEach( (cartItem) => {
          if(cartItem.productId !== productId){
            newCart.push(cartItem);
          }
        } );
        this.cartItems=newCart;
        this.saveToStorage();
      },

      CalculatecartQuantity(){
        let TotalQuantity=0;
        this.cartItems.forEach( (cartItem) => {
          TotalQuantity += cartItem.quantity;
        });
        return TotalQuantity
      },


      UpdatecartQuantity(productId,newQuantity){
        this.cartItems.forEach( (cartItem) => {
        if(cartItem.productId === productId){
          cartItem.quantity = newQuantity;
        }
        });
        this.saveToStorage();
      },


      updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
          if (cartItem.productId === productId) {
            matchingItem = cartItem;
          }
        }); 

        matchingItem.deliveryOptionId = deliveryOptionId;

        //Saving to local Storage
        this.saveToStorage();
      }
      

  };
  return cart;

}


const cart = Cart('cart-oop');
cart.loadFromStorage();

const buisnesscart = Cart('cart-buisness');
buisnesscart.loadFromStorage();

//tocheck if they are having differnet products console.log 
console.log(cart);
console.log(buisnesscart);


