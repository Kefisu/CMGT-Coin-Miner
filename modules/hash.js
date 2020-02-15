const helpers = require('./helpers');
const crypto = require('crypto');

module.exports = {
    createLastBlockString: (obj) => {

        let block = '';

        for (let blok of obj.blockchain.data) {
            block += blok.from + blok.to + blok.amount + blok.timestamp
        }

        return obj.blockchain.hash + block + obj.blockchain.timestamp + obj.blockchain.nonce;
    },
    createNewBlockString: (string, obj) => {
        let transactionString = '';

        for (let transaction of obj.transactions) {
            transactionString += transaction.from + transaction.to + transaction.amount + transaction.timestamp
        }

        return string + transactionString + obj.timestamp;
    },
    execute: (string) => {
        // Replace spaces
        let arr = helpers.stringToArray(helpers.replaceWhitespaces(string));

        // Convert string to chars in array
        // let arr = s.split("");

        // Convert chars to ascii
        let ascii = [];
        for (let char of arr) {
            if (!isNaN(parseInt(char))) {
                ascii.push(char)
            } else {
                ascii.push(char.charCodeAt(0));
            }
        }

        // Split numbers
        let splitAscii = ascii.map(num => {
            return num.toString().split("");
        }).reduce((col, nums) => (col.push(...nums), col), []);

        // Add till mod of 10
        let left = 10 - (splitAscii.length % 10);
        for (let i = 0; i < left; i++) {
            splitAscii.push(i)
        }

        // Make mod 10 arrays
        let multipleArrays = [];
        for (let i = 0; i < splitAscii.length; i += 10) {
            multipleArrays.push(splitAscii.slice(i, i + 10))
        }

        let finalArray = mod10(multipleArrays, ...multipleArrays.splice(0, 1));

        // Create string && hash that string
        const nonHashString = finalArray.toString().replace(/,/g, '');
        return crypto.createHash('sha256').update(nonHashString).digest('hex');
    },
}

function mod10(collection, summary) {
    if (collection.length === 0) {
        return summary
    }
    return mod10(collection, addition(summary, ...collection.splice(0, 1)))
}

function addition(arr1, arr2) {
    let arr = [];

    for (let i = 0; i < 10; i++) {
        arr.push((parseInt(arr1[i]) + parseInt(arr2[i])) % 10)
    }
    return arr;
}