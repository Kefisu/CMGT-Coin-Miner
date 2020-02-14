const addition = (arr1, arr2) => {
    let arr = [];

    for (let i = 0; i < 10; i++) {
        arr.push((parseInt(arr1[i]) + parseInt(arr2[i])) % 10)
    }
    return arr;
}

module.exports = addition;