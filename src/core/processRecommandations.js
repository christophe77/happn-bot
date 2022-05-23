const { recommandations } = require('happn-api').default;
const colors = require('../utils/colors');
const handleRecommandation = require('./handleRecommandation');

async function processRecommandations(savePictures, criterias) {
  let renewableLikes = -1;
  const myRecommandations = await recommandations();
  if (myRecommandations.data?.length === 0) {
    renewableLikes = -1;
  } else {
    await Promise.all(
      myRecommandations.data.map(async (recommandation) => {
        try {
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
          }
        } catch (error) {
          console.log(
            colors.bgRed,
            `handleRecommandation failed ${error.message}`,
            colors.reset
          );
          renewableLikes = 0;
        }
      })
    );
  }
  return renewableLikes;
}

module.exports = processRecommandations;
