const inquirer = require('inquirer');

module.exports = {
    askToStartMiner : () => {
        const question = [
            {
                name: 'start',
                type: 'confirm',
                message: 'Do you want to start the miner?'
            }
        ]
        return inquirer.prompt(question);
    }
}