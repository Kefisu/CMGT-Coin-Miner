const inquirer = require('inquirer');

module.exports = {
    askToStartMiner : () => {
        const question = [
            {
                name: 'start',
                type: 'confirm',
                message: 'Do you want to start the miner?'
            }
        ];
        return inquirer.prompt(question);
    },
    askForMiningMode: () => {
        const question = [
            {
                name: 'mode',
                type: 'list',
                message: 'Which nonce mode should the miner be in? (Use numbers, ex. prnt.sc, enter 2)',
                choices: [
                    'number',
                    'prnt.sc',
                    // 'string',
                    'words',
                    'coins'
                ]
            }
        ];
        return inquirer.prompt(question).then(answer => {return answer.mode})
    }
}