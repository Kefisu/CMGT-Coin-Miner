const randomString = (length) => {
    let text = "";
    let possible = "123456789abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

module.exports = randomString;