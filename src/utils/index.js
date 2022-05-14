async function delay(ms) {
    return new Promise((res) => {
        setTimeout(() => {
            res(() => {
                console.log('delay ends');
            });
        }, ms);
    });
}

module.exports = {
    delay
};
