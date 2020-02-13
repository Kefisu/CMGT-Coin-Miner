const inquirer = require('inquirer');

module.exports = {
    askToStartMiner : () => {
        const question = [
            {
                name: 'start',
                type: 'confirm',
                message: 'Wilt u de miner starten?'
            }
        ]
        return inquirer.prompt(question);
    }
}