class Cart {
  cartItems;
  localStorageKey;


  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(
      localStorage.getItem(this.localStorageKey)
    );

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
          quantity: 1,
          deliveryOptionId: '1'
        }
      ];
    }
  }

  saveToStorage() {
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.cartItems)
    );
  }

  addToCart(productId, quantity = 1) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let totalQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      totalQuantity += cartItem.quantity;
    });

    return totalQuantity;
  }

  updateCartQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = newQuantity;
      }
    });

    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      };
    });

    if (matchingItem) {
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    };
  };
};

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);


