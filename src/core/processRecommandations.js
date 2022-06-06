const { recommandations } = require('happn-api').default;
const colors = require('../utils/colors');
const timeout = require('../utils/timeout');
const handleRecommandation = require('./handleRecommandation');

async function processRecommandations(savePictures, criterias) {
  let renewableLikes = -1;
  const myRecommandations = await recommandations();
  if (myRecommandations.data?.length === 0) {
    renewableLikes = -1;
  } else {
    for (const recommandation of myRecommandations.data) {
      try {
        await timeout(2000);
        if (renewableLikes === -1 || renewableLikes > 0) {
          const remainingLike = await handleRecommandation(
            recommandation.content.user,
            savePictures,
            criterias
          );
          renewableLikes = remainingLike;
        } else {
          console.log(
            colors.bgRed,
            'no more likes available',
            renewableLikes,
            colors.reset
          );
          renewableLikes = 0;
          break;
        }
      } catch (error) {
        console.log(
          colors.bgRed,
          `handleRecommandation failed ${error.message}`,
          colors.reset
        );
        renewableLikes = 0;
        break;
      }
    }
  }
  return renewableLikes;
}

module.exports = processRecommandations;
