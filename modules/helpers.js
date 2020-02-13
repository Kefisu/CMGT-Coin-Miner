module.exports = {
    replaceWhitespaces: (string) => {
        return string.replace(/\s/g, '');
    },
    stringToArray: (string) => {
        return string.split("");
    },
};