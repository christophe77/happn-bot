const colors = require('../utils/colors');
const {
  handleWithCriterias,
  handleWithoutCriterias,
} = require('./common/userHandling');

async function handleRecommandation(user, savePictures, criterias) {
  if (criterias) {
    try {
      const renewableLikes = await handleWithCriterias(
        user,
        savePictures,
        criterias
      );
      return renewableLikes || 0;
    } catch (error) {
      console.log(
        colors.bgRed,
        `handleWithCriterias failed ${error.message}`,
        colors.reset
      );
      return 0;
    }
  } else {
    try {
      const renewableLikes = await handleWithoutCriterias(user, savePictures);
      return renewableLikes || 0;
    } catch (error) {
      console.log(
        colors.bgRed,
        `handleWithoutCriterias failed ${error.message}`,
        colors.reset
      );
      return 0;
    }
  }
}

module.exports = handleRecommandation;
