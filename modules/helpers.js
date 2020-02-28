module.exports = {
    replaceWhitespaces: (string) => {
        return string.replace(/\s/g, '');
    },
    stringToArray: (string) => {
        return string.split("");
    },
    addition: (arr1, arr2) => {
        let arr = [];

        for (let i = 0; i < 10; i++) {
            arr.push((parseInt(arr1[i]) + parseInt(arr2[i])) % 10)
        }
        return arr;
    },
    mod10: (collection, summary) => {
        if (collection.length === 0) {
            return summary
        }
        return mod10(collection, addition(summary, ...collection.splice(0, 1)))
    },
    randomString: (length) => {
        let text = "";
        let possible = "123456789abcdefghijklmnopqrstuvwxyz";
        for (let i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    },
    splitNumbers: (arr) => {
        return arr.map(num => {
            return num.toString().split("");
        }).reduce((col, nums) => (col.push(...nums), col), []);
    },
    toAscii: (arr) => {
        return arr.map(char => {
            return !isNaN(parseInt(char)) ? char : char.charCodeAt(0)
        });
    }
};