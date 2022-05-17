const colors = require('../utils/colors');
const login = require('./login');
const processRecommandations = require('./processRecommandations');

async function start(savePictures, criterias) {
    const loginSuccess = await login();
    if (loginSuccess) {
        await processRecommandations(savePictures, criterias);
    } else {
        console.log(colors.bgRed, "login failed", colors.reset);
    }
}
module.exports = start;
