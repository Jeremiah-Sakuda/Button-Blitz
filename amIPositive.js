/**
 * @param num A num
 * @return true iff num is greater than 0
 */
function amIPositive(num) {
    return num > 0;
}

module.exports = amIPositive;

function testAmIPositive() {
    const amIPositive = require('./amIPositive');

    test('should return true for all real positive numbers', () => {
        expect(amIPositive(1)).toBe(true);
        expect(amIPositive(10.59)).toBe(true);
        expect(amIPositive(200)).toBe(true);
    });

    test('should return false for the number zero', () => {
        expect(amIPositive(0)).toBe(false);
    });

    test('should return false for all real negative numbers', () => {
        expect(amIPositive(-1)).toBe(false);
        expect(amIPositive(-0.314)).toBe(false);
        expect(amIPositive(-1000)).toBe(false);
    });
}

testAmIPositive();