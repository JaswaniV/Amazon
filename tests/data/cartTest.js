import { cart, addToCart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

describe('test suite: addToCart', () => {

    //Using beforeEach hook for spyOn ls.setItem
    // A16e 
    beforeEach( () => {
        spyOn(localStorage,'setItem')
    })
    // A16e 



    it('Adds an existing product in the cart', () => {

        spyOn(localStorage, 'getItem').and.callFake( () =>{
            return JSON.stringify([
                {
                    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity:1,
                    deliveryOprtionId:'1'
                }
            ]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        //Using the toHaveBeenCalled method of expect to check if the addToCart function calls the setItem function once
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        // A16c --> checking if the ls.setItem is receiving the correct Value of the cart
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
        //A16c

        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
    });
    


    it('Adds a new product in the cart', () => {
        //MOCK for localStorage.getItem
        spyOn(localStorage, 'getItem').and.callFake( () =>{
            //AS we know LS only supports string 
            //therefore, we ahve to return string 

            return JSON.stringify([]);
        }); 
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        //Using the toHaveBeenCalled method of expect to check if the addToCart function calls the setItem function once
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        // A16d --> checking if the ls.setItem is receiving the correct Value of the cart
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
        //A16d

        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
    
});












//A16i
//Test Suite for removeFromCart fucntion
describe('Test Suite: removeFromCart', () => {
  afterEach( () => {
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
  });


  beforeEach( () =>{
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake( () => {
      return JSON.stringify([
        {
          productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity:1,
          deliveryOprtionId:'1'
        }
      ]);
    });
    loadFromStorage();
  });

  const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 ='123abc';

  it('Removes the product from the cart', () => {
    removeFromCart(productId1);

    //Expectations
    expect(cart.length).toEqual(0);
  });

  it('Does Nothing if the product is not in the cart', () => {
    removeFromCart(productId2);

    //Expectations
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(1);

  })
});
// A16i






//A16k- Test Suite for updateDeliveryOption Function
describe('Test Suite : updateDeliveryOption Fucntion', () => {
  
  beforeEach( () => {
    cart.length=0;
    spyOn(localStorage, 'setItem');

    spyOn(localStorage,'getItem').and.callFake( () => {
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1'
        }
      ]);
    });
    loadFromStorage();

  });

  it('Updates delivery option for existing product', () => {
    updateDeliveryOption(
      'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      '3'
    );

    expect(cart[0].deliveryOptionId).toBe('3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });




  it('Does nothing if product is not in the cart', () => {
    // productId that does NOT exist
    const missingProductId = 'not-in-cart-id';

    updateDeliveryOption(missingProductId, '3');

    // cart should remain unchanged
    expect(cart.length).toBe(1);
    expect(cart[0].deliveryOptionId).toBe('1');

    // localStorage should NOT be updated
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
//A16k