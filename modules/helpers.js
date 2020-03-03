module.exports = {
    replaceWhitespaces: (string) => {
        return string.replace(/\s/g, '');
    },
    stringToArray: (string) => {
        return string.split("");
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
    },
};