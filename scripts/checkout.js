import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from '../data/products.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js'


//Promise Practice
/* 
new Promise( (resolve) => {
    console.log('Start Promise');
    loadProducts( () => {
        console.log('start Loading');
        resolve();
        console.log('finished laoding')
    });
}).then( () => { //Using the then function
    console.log('Next Step')// this is the actual next step resolve will go to
})
*/


/*Example of promise.all() using loadCart just for example
Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('value1');
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
})
]).then((values) => {
console.log(values);
renderOrderSummary();
renderPaymentSummary();
});

 */



new Promise( (resolve) => {
  loadProducts( () => {
      resolve(resolve);
  });
}).then( (value) => {
  renderOrderSummary(); 
  renderPaymentSummary();
})












/* 
loadProducts( () =>{
    renderOrderSummary(); 
    renderPaymentSummary();
})
//again these two will be passed when we call fun
*/