const calculate = require('./calculate');

const addition = (arr1, arr2) => {
    let arr = [];

    for (let i = 0; i < 10; i++) {
        arr.push(calculate.add(parseInt(arr1[i]), parseInt(arr2[i])) % 10)
    }
    return arr;
}

module.exports = addition;