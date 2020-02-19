const figlet = require('figlet');
const chalk = require('chalk');
const spinner = require('cli-spinner').Spinner;
const axios = require('axios');

const inquirer = require('./modules/inquirer');

// const helpers = require('./modules/helpers');
const hash = require('./modules/hash.js');
const randomString = require('./modules/helpers/randomString');

let fetchSpinner = new spinner('%s Blok ophalen');
let workingSpinner = new spinner('%s Bezig met minen');

let mode = null;

const start = async () => {
    console.clear();
    console.log(chalk.red(figlet.textSync('CMGT Coin Miner v0.1', {horizontalLayout: 'full'})));
    const command = await inquirer.askToStartMiner();

    if (command.start) {
        mode = await inquirer.askForMiningMode();

        if (mode) {
            console.log(chalk.green('Starting CMGT Coin Miner'));
            console.log('Hashing with nonce mode:', mode);
            mine();
        }
    }
}

function mine() {
    fetchSpinner.start();

    axios.get('https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next')
        .then(res => {

            fetchSpinner.stop(true);

            if (res.data.open) {
                workingSpinner.start();

                let string = hash.execute(hash.createLastBlockString(res.data));
                let newString = hash.createNewBlockString(string, res.data);

                doHash(newString)
            } else {
                console.log(chalk.yellow(`Block locked. Time until opening: ${res.data.countdown}ms`));
                setTimeout(() => mine(), res.data.countdown / 10)
            }
        })
        .catch(err => console.error(err));
}

function doHash(string) {
    const t0 = new Date().getTime();
    let nonce = 0;
    let number = 0;
    switch (mode) {
        case 'number':
            nonce = 0;
            break;
        case 'prnt.sc':
            number = '123456';
            nonce = 'prnt.sc/' + number;
            break;
    }
    let hashed = hash.execute(string + nonce);

    while (hashed.substr(0, 4) !== '0000') {
        switch (mode) {
            case 'number':
                nonce++;
                break;
            case 'prnt.sc':
                number = randomString(6);
                nonce = 'prnt.sc/' + number;
                break;
        }
        hashed = hash.execute(string + nonce);
    }

    const t1 = new Date().getTime();

    workingSpinner.stop(true);
    console.log(`Mining ended after: ${t1 - t0}ms`);

    axios.post('https://programmeren9.cmgt.hr.nl:8000/api/blockchain', {
        nonce: nonce,
        user: '0944552'
    }).then(res => {
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

start();
