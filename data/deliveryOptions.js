import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
export const deliveryOptions =[
    {
        id:'1',
        deliveryDays:7,
        price:0
    },
    {
        id:'2',
        deliveryDays:3,
        price:100
    },
    {
        id:'3',
        deliveryDays:1,
        price:200
    }
];

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;

    deliveryOptions.forEach( (option) => {
        if(option.id === deliveryOptionId){
        deliveryOption = option;
    }
    });
    return deliveryOption || deliveryOptions[0];
}


//a15l
export function calculateDeliveryDate(deliveryOption){ 
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const dateString = deliveryDate.format(
        'dddd, MMMM D');

    return dateString;
}