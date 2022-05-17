const { recommandations } = require('happn-api').default;
const colors = require('../utils/colors');
const handleRecommandation = require("./handleRecommandation");

async function processRecommandations(savePictures, criterias) {
    const myRecommandations = await recommandations();
    let renewableLikes = -1;
    myRecommandations.data.forEach(async (recommandation) => {
        try {
            if (renewableLikes === -1 || renewableLikes > 0) {
                const remainingLike = await handleRecommandation(recommandation.content.user, savePictures, criterias);
                renewableLikes = remainingLike;
            } else {
                console.log(colors.bgRed, "no more likes available", renewableLikes, colors.reset);
                return false;
            }
        } catch (error) {
            console.log(colors.bgRed, `handleRecommandation failed ${error.message}`, colors.reset);
            return false;
        }
    });
    return true;
}

module.exports = processRecommandations;