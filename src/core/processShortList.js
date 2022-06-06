const getShortList = require('./shortList');
const colors = require('../utils/colors');
const timeout = require('../utils/timeout');
const handleShortList = require('./handleShortList');

async function processShortList(savePictures, criterias) {
  console.log(colors.bgBlue, 'processing shortlist', colors.reset);
  let renewableLikes = -1;
  const myShortList = await getShortList();
  if (myShortList.data?.shortlist_users?.length === 0) {
    renewableLikes = -1;
  } else {
    for (const recommandation of myShortList.data.shortlist_users) {
      try {
        await timeout(2000);
        if (renewableLikes === -1 || renewableLikes > 0) {
          const remainingLike = await handleShortList(
            recommandation.user,
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
          `handleShortList failed ${error.message}`,
          colors.reset
        );
        renewableLikes = 0;
        break;
      }
    }
  }
  return renewableLikes;
}

module.exports = processShortList;
