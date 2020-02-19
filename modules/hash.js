const helpers = require('./helpers');
const crypto = require('crypto');

const mod10hash = require('./helpers/mod10hash');

const fillables = [0,1,2,3,4,5,6,7,8,9];

module.exports = {
    createLastBlockString: (obj) => {

        let block = '';
        obj.blockchain.data.map(data => block += data.from + data.to + data.amount + data.timestamp)

        return obj.blockchain.hash + block + obj.blockchain.timestamp + obj.blockchain.nonce;
    },
    createNewBlockString: (string, obj) => {
        let transactionString = '';
        obj.transactions.map(data => transactionString += data.from + data.to + data.amount + data.timestamp)

        return string + transactionString + obj.timestamp;
    },
    execute: (string) => {
        // Replace spaces
        let arr = helpers.stringToArray(helpers.replaceWhitespaces(string));

        // Convert chars to ascii
        let ascii = [];
        arr.map(char => {
            !isNaN(parseInt(char)) ? ascii.push(char) : ascii.push(char.charCodeAt(0))
        });

        // Split numbers
        let splitAscii = ascii.map(num => {
            return num.toString().split("");
        }).reduce((col, nums) => (col.push(...nums), col), []);

        // Add till mod of 10
        // let left = 10 - (splitAscii.length % 10);
        // for (let i = 0; i < left; i++) {
        //     splitAscii.push(i)
        // }
        splitAscii.push(...fillables.slice(0, (10 - (splitAscii.length % 10))));


        // Make mod 10 arrays
        let multipleArrays = [];
        for (let i = 0; i < splitAscii.length; i += 10) {
            multipleArrays.push(splitAscii.slice(i, i + 10))
        }

        let finalArray = mod10hash(multipleArrays, ...multipleArrays.splice(0, 1));

        // Create string && hash that string
        const nonHashString = finalArray.toString().replace(/,/g, '');
        return crypto.createHash('sha256').update(nonHashString).digest('hex');
    },
}