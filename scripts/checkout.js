import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from '../data/products.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js'



async function loadPage(){
  await loadProductsFetch();

  /*If using loadCart()
    await new Promise((resolve) =>{
        laodCart(() ={
          resolve();
        })
      });
  */

  renderOrderSummary();
  renderPaymentSummary();
};

loadPage();



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







/*Async practice
async function laodPage(){
  console.log('loadPage');
  return 'value1';//Same as resolve('value1) therefore .then can access it using parameter
}
//as loadPage() is a async function therfore it returns a promise therefore we can use .then fucntion
laodPage().then( (data) => {
  console.log('nextStep');
  console.log(data );
})


//Async await
async function lp() {
  console.log('lp');

  await loadProductsFetch();

  return 'value2';
}

lp().then( (data) => {
  clg("value2 from asyn await");
  clg(data);
})
  */











// loadProductsFetch()
//     .then( (value) => {
//         renderOrderSummary(); 
//         renderPaymentSummary();
//     });












/* 
loadProducts( () =>{
    renderOrderSummary(); 
    renderPaymentSummary();
})
//again these two will be passed when we call fun
*/