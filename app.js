const figlet = require('figlet');
const chalk = require('chalk');
const spinner = require('cli-spinner').Spinner;

const axios = require('axios');
const crypto = require('crypto');

const inquirer = require('./modules/inquirer');
const helpers = require('./modules/helpers');
const hash = require('./modules/hash.js');

const mod10hash = require('./modules/helpers/mod10hash');

let fetchSpinner = new spinner('%s Blok ophalen');
let workingSpinner = new spinner('%s Bezig met minen');
let sessionBlocksMined = 0;

const start = async () => {
    console.clear();
    console.log(
        chalk.red(
            figlet.textSync('CMGT Coin Miner v0.1', {
                horizontalLayout: 'full'
            })
        )
    );

    const command = await inquirer.askToStartMiner();

    if (command.start) {
        console.log(chalk.green('Starting CMGT Coin Miner'));
        mine();
    }
}

function mine() {
    fetchSpinner.start();

    axios.get('https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next')
        .then(res => {

            fetchSpinner.stop(true);

            if (res.data.open) {
                workingSpinner.start();

                let string = hashFunc(hash.createLastBlockString(res.data));
                let newString = hash.createNewBlockString(string, res.data);

                // doHash('00005d430ce77ad654b5309a770350bfb4cf49171c682330a2eccc98fd8853cfCMGT Mining CorporationBas BOOTB115487477332611548748101396')
                doHash(newString)
            } else {
                console.log(chalk.yellow(`Block locked. Going idle for ${res.data.countdown}ms`));
                setTimeout(() => mine(), res.data.countdown)
            }
        })
        .catch(err => console.error(err));
}

function hashFunc(string) {

    // Replace spaces
    let arr = helpers.stringToArray(helpers.replaceWhitespaces(string));

    // Map through array and convert al non numeric chars to ASCII
    let ascii = arr.map(item => {
        return isNaN(parseInt(item)) ? item.charCodeAt(0) : item;
    });

    // Split numbers
    let splitAscii = ascii.map(num => {
        return num.toString().split("");
    }).reduce((col, nums) => (col.push(...nums), col), []);

    // Add till length is mod of 10
    let left = 10 - (splitAscii.length % 10);
    for (let i = 0; i < left; i++) {
        splitAscii.push(i)
    }

    // Make group10 arrays
    let multipleArrays = [];
    for (let i = 0; i < splitAscii.length; i += 10) {
        multipleArrays.push(splitAscii.slice(i, i + 10))
    }

    let finalArray = mod10hash(multipleArrays, ...multipleArrays.splice(0, 1));

    // Create string && hash that string
    const nonHashString = finalArray.toString().replace(/,/g, '');
    return crypto.createHash('sha256').update(nonHashString).digest('hex');
}

function doHash(string) {
    // let number = '123456';
    // let nonce = 'prnt.sc/' + number;
    let nonce = 0;
    let hashed = hashFunc(string + nonce);

    while (hashed.substr(0, 4) !== '0000') {
        // number = generateRandomString(6);
        // nonce = 'prnt.sc/' + number;
        nonce++;
        hashed = hashFunc(string + nonce);
    }
    workingSpinner.stop(true);
    console.log('Hash accepted: ', hashed)
    console.log('Nonce accepted: ', nonce)
    goIdle();
    axios.post('https://programmeren9.cmgt.hr.nl:8000/api/blockchain', {
        nonce: nonce,
        user: 'To whom it may concern. I broke the system. #K'
    }).then(res => {
        workingSpinner.stop(true);
        if (res.data.message === 'blockchain accepted, user awarded') {
            console.log('Acccepted hash: ', hashed);
            console.log('Status: ', res.data.message);
            console.log('Accepted nonce', nonce);

            goIdle();
        } else if (res.data.message = 'nonce not correct') {
            console.log(chalk.red(res.data.message))
            goIdle();
        } else {
            console.log(chalk.red(res.data.message))
            mine()
        }
    })
}

function goIdle() {
    axios.get('https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next').then(res => {
        console.log(chalk.yellow(`Going idle for ${res.data.countdown}ms`))
        setTimeout(() => mine(), res.data.countdown)
    })
}

function countMyRecords() {
    let recordCount = 0;

    axios.get('https://programmeren9.cmgt.hr.nl:8000/api/blockchain').then(res => {
        for (let item of res.data) {
            for (let transaction of item.data) {

                if (transaction.to === '0944552' || transaction.to === 'Kevin') {
                    recordCount++
                }
            }
        }
        console.log(chalk.cyan(`You have ${recordCount} CMGT Coins.`))
    })

}

start();
// countMyRecords();

function generateRandomString(length) {

    var text = "";

    var possible = "123456789abcdefghijklmnopqrstuvwxyz";



    for (var i = 0; i < length; i++)

        text += possible.charAt(Math.floor(Math.random() * possible.length));



    return text;

}
