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
}