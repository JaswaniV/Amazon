import { formatCurrency } from '../../scripts/utils/money.js'



/* Just for understnading
describe('Test Suite: formatCurrency', () => {
    it('convert cent to dollars', () => {
        expect((formatCurrency(2095)/100)).toEqual(20.95);
    });
    
});
 */


describe('Test Suite: formatCurrency', () => {
    it('works with 0 ', () => {
        expect((formatCurrency(0))).toEqual(0.00);
    });

    it('round up to the nearest', () =>{
        expect((formatCurrency(2000.5)/100)).toEqual(20.01);
    });
    it('working with negative numbers' , () => {
        expect(formatCurrency(-1000)).toEqual(-1000);
    })
     
});


