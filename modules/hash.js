module.exports = {
    createLastBlockString: (obj) => {
        return obj.blockchain.hash + obj.blockchain.data[0].from + obj.blockchain.data[0].to + obj.blockchain.data[0].amount + obj.blockchain.data[0].timestamp + obj.blockchain.timestamp + obj.blockchain.nonce;
    },
    createNewBlockString: (string, obj) => {
        let transactionString = '';

        for (let transaction of obj.transactions) {
            transactionString += transaction.from + transaction.to + transaction.amount + transaction.timestamp
        }

        return string + transactionString + obj.timestamp;
    },
}