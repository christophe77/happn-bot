const colors = require('../utils/colors');
const login = require('./login');
const processRecommandations = require('./processRecommandations');

async function recommandationLoop(savePictures, criterias) {
  const remainingLikes = await processRecommandations(savePictures, criterias);
  if (remainingLikes === -1) {
    console.log(
      colors.bgRed,
      'no recommandations available for the moment',
      colors.reset
    );
  } else if (remainingLikes > 0) {
    await recommandationLoop(savePictures, criterias);
  } else {
    console.log(colors.bgRed, 'no more likes for the moment', colors.reset);
  }
}

async function start(savePictures, criterias) {
  const loginSuccess = await login();
  if (loginSuccess) {
    await recommandationLoop(savePictures, criterias);
  } else {
    console.log(colors.bgRed, 'login failed', colors.reset);
  }
}

module.exports = start;
