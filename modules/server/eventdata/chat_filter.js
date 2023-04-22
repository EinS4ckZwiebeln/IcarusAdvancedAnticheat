module.exports = (source, author, text) => {
    if (GetPlayerName(source) != author || !(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(text))) {
        CancelEvent();
    }
};