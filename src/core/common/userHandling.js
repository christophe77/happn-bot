const { dislike } = require('happn-api').default;
const likeUser = require('./likeUser');
const checkCriterias = require('./checkCriterias');
const colors = require('../../utils/colors');
const saveUserPictures = require('../../utils/pictures');

async function handleWithCriterias(user, savePictures, criterias) {
  const { id, first_name, age, gender, profiles } = user;
  let renewableLikes = -1;
  const userHasAllCriterias = checkCriterias(user, criterias);
  if (userHasAllCriterias) {
    try {
      renewableLikes = await likeUser(user);
      if (savePictures) {
        await saveUserPictures(user);
      }
      return renewableLikes || 0;
    } catch (error) {
      console.log(colors.bgRed, `like failed ${error.message}`, colors.reset);
      return 0;
    }
  } else {
    try {
      await dislike(id);
      console.log(
        colors.bgYellow,
        `you disliked ${first_name} ${age} ${gender} ${profiles.length} pictures`,
        colors.reset
      );
      return renewableLikes || 0;
    } catch (error) {
      console.log(
        colors.bgRed,
        `dislike failed ${error.message}`,
        colors.reset
      );
      return renewableLikes || 0;
    }
  }
}
async function handleWithoutCriterias(user, savePictures) {
  try {
    const renewableLikes = await likeUser(user);
    if (savePictures) {
      await saveUserPictures(user);
    }
    return renewableLikes || 0;
  } catch (error) {
    console.log(colors.bgRed, `like failed ${error.message}`, colors.reset);
    return 0;
  }
}

module.exports = { handleWithCriterias, handleWithoutCriterias };
