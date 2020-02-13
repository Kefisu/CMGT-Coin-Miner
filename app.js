const axios = require('axios');
const crypto = require('crypto');

let lastBlock = axios.get('https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next')
    .then(res => {
        let string = hash(createLastBlockString(res.data));
        let newString = createNewBlockString(string, res.data);

        console.log(hash("text"))

        doHash(newString)

        // console.log(hash("text"));
        // console.log(res.data);
    })
    .catch(err => console.error(err));

function hash(string) {

    // Replace spaces
    let arr = stringToArray(replaceWhitespaces(string));

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
    let splitAscii = [];
    for (let num of ascii) {
        const nums = num.toString().split("");
        for (let n of nums) {
            splitAscii.push(parseInt(n))
        }
    }

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

    // Add all array vars to one array
    let finalArray = [];
    let length = multipleArrays.length;
    for (let i = 0; i < 10; i++) {
        let num = 0;

        for (let arr of multipleArrays) {
            num += arr[i];
        }

        finalArray.push(num % 10);
    }

    // Create string && hash that string
    const nonHashString = finalArray.toString().replace(/,/g, '');
    return crypto.createHash('sha256').update(nonHashString).digest('hex');
}

function doHash(string) {
    let nonce = 0;
    let hashed = hash(string + nonce);

    while (hashed.substr(0, 4) !== '0000') {
        nonce++
        hashed = hash(string + nonce);
    }
    console.log(nonce);
    console.log(hashed);
    axios.post('https://programmeren9.cmgt.hr.nl:8000/api/blockchain', {
        nonce: nonce,
        user: 'Kevin'
    }).then(res => console.log(res.data))
}

function replaceWhitespaces(string) {
    return string.replace(/\s/g, '');
}

function stringToArray(string) {
    return string.split("");
}

function createLastBlockString(obj) {
    let s = obj.blockchain.hash + obj.blockchain.data[0].from + obj.blockchain.data[0].to + obj.blockchain.data[0].amount + obj.blockchain.data[0].timestamp + obj.blockchain.timestamp + obj.blockchain.nonce;
    console.log(s)
    return s;
}

function createNewBlockString(string, obj) {
    let s = string + obj.transactions[0].from + obj.transactions[0].to + obj.transactions[0].amount + obj.transactions[0].timestamp + obj.timestamp
    console.log(s)
    return s;
}