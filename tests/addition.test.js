const addition = require('../modules/helpers/addition');
const calculate = require('../modules/helpers/calculate');

const arr1 = [1, 1, 6, 1, 0, 1, 1, 2, 0, 1];
const arr2 = [1, 6, 0, 1, 2, 3, 4, 5, 6, 7];

test('Adds two arrays together with the mod10 hash', () => {
    expect(addition(arr1, arr2)).toStrictEqual([2, 7, 6, 2, 2, 4, 5, 7, 6, 8])
});

test('Adds two numbers together', () => {
    expect(calculate.add(1, 1)).toBe(2)
});