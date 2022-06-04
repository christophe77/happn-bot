const getShortList = require('./shortList');
const colors = require('../utils/colors');
const handleShortList = require('./handleShortList');

async function processShortList(savePictures, criterias) {
  let renewableLikes = -1;
  const myShortList = await getShortList();
  if (myShortList.data?.shortlist_users?.length === 0) {
    renewableLikes = -1;
  } else {
    await Promise.all(
      myShortList.data.shortlist_users.map(async (recommandation) => {
        try {
          if (renewableLikes === -1 || renewableLikes > 0) {
            const remainingLike = await handleShortList(
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
            `handleShortList failed ${error.message}`,
            colors.reset
          );
          renewableLikes = 0;
        }
      })
    );
  }
  return renewableLikes;
}

module.exports = processShortList;
