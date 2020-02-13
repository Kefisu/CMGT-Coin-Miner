module.exports = {
    createLastBlockString: (obj) => {
        return obj.blockchain.hash + obj.blockchain.data[0].from + obj.blockchain.data[0].to + obj.blockchain.data[0].amount + obj.blockchain.data[0].timestamp + obj.blockchain.timestamp + obj.blockchain.nonce;
    },
    createNewBlockString: (string, obj) => {
        return string + obj.transactions[0].from + obj.transactions[0].to + obj.transactions[0].amount + obj.transactions[0].timestamp + obj.timestamp;
    },
}