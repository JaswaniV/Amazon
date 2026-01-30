import { loadFromStorage, cart } from '../../data/cart.js';
import {renderOrderSummary,} from '../../scripts/checkout/orderSummary.js';
import { loadProducts, loadProductsFetch } from '../../data/products.js';


describe('Test suite: renderOrderSummary', () =>{
    //beore all hook for laoding the products
   beforeAll((done) => {
    loadProductsFetch().then( () => {
      done();
    });
   });

    //afterEach hook
    afterEach( () => {
        document.querySelector('.js-test-container').innerHTML=``;
    })


    const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2='54e0eccd-8f36-462b-b68a-8182611d9add';


    //beforeEach hook
    beforeEach( () => {
        document.querySelector('.js-test-container').innerHTML=`
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div> 
        `;

        /*If the test stops working try putting the line written
         in this comment after the container with class js-order summary
        <div class="js-checkout-total-quantity"></div>
         */
        
        /*
        Since we have the div with class named js-order-summary , 
        So when we'll call the renderOrderSummary function it 
        will put the html inside the div with class js-order-summary  
        */


        //Mocking lS.getItem So it cotains an Item at start
        spyOn(localStorage, 'getItem').and .callFake( () =>{
            return JSON.stringify([
                {
                    productId:productId1,
                    quantity:2,
                    deliveryOptionId:'1'
                },

                {
                    productId:'54e0eccd-8f36-462b-b68a-8182611d9add',
                    quantity:1,
                    deliveryOptionId:'2'
                }
            ]);
        });
        loadFromStorage();
        /*
        We are calling the loadFromStorage fucntion so that lS.getItem runs and 
        gets the prouct which we added while mockiong only and 
        not any other default value in the cart 
        */

        renderOrderSummary();
        /*The rednerOrderSummary function create the left section
        but to show the products we have not loaded the products array that's why it is giving error on the test page
         */
    })



    //How the page looks
    it('displays the cart', () =>{
        
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

        //for quantity
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText)
            .toContain('Quantity: 2');

        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText)
        .toContain('Quantity: 1');
        
    });


    it('Removes a product', () => { 

        //clicking the delete button
        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

        //As we are removing the first product 
        // Therefore  checking that it should not be present on the page
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);

        //All three below are to check if second is still there
        expect(
        document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
        });
});


//A16j
describe('Test suite : Update delivery option on clicking', () => {
  /*afterEach( () => {
        document.querySelector('.js-test-container').innerHTML=``;
    })
    
    Add this afterEach hook if you want that the page should not contain the html
  */

  beforeAll((done) => {
    loadProducts(() => {
        done();
    }); 
   });

  beforeEach( () => {
    cart.length=0;

    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake( () => {
        return JSON.stringify([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }
        ]);
    });

    document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
    `;
    /*After the elemet with class named js-payment-summary
      there was an element --> <div class="js-checkout-total-quantity"></div>
      I removed it if the TotalItem() function gives error ask gpt and add it
    */

    loadFromStorage();
    renderOrderSummary();
  });


  it('Updates the clicked delivery option', () => {
    const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const deliveryOptionId1='3';

    const deliveryOption = document.querySelector(
        `.js-delivery-option-${productId1}-3`
    );

    deliveryOption.click();

    const deliveryOptionInput = document.querySelector(
      `.js-delivery-option-input-${productId1}-3`
    );
    expect(deliveryOptionInput.checked).toEqual(true);

    //checking ig the cart is correct (mentioned in the assignment)
    expect(cart.length).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('3');
    
  });

});
