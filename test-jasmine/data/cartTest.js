import { cart, addToCart, loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {
    it('Adds an existing product in the cart', () => { 
        //MOCK for localStorage.setItem
        spyOn(localStorage,'setItem');

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

        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
    });
    


    it('Adds a new product in the cart', () => {
        //MOCK for localStorage.setItem
        spyOn(localStorage,'setItem'); //done
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

        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
    
});
