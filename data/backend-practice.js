const xhr = new XMLHttpRequest();

//Waiting for the response
xhr.addEventListener('load', () => {
    console.log(xhr.response);
})


xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();


//trying differnt url paths

//1
const xhr1 = new XMLHttpRequest();

//Waiting for the response
xhr1.addEventListener('load', () => {
    console.log(xhr1.response);
})


xhr1.open('GET', 'https://supersimplebackend.dev/hello');
xhr1.send();


//2
const xhr2 = new XMLHttpRequest();

//Waiting for the response
xhr2.addEventListener('load', () => {
    console.log(xhr2.response);
})


xhr2.open('GET', 'https://supersimplebackend.dev/products/first');
xhr2.send();