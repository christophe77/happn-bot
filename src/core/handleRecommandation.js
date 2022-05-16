const { like, dislike } = require('happn-api').default;
const checkCriterias = require("./checkCriterias");
const colors = require('../utils/colors');

async function handleRecommandation(user, criterias) {
    const { id, first_name, age, gender, profiles } = user;
    const userHasAllCriterias = checkCriterias(user, criterias);

    if (userHasAllCriterias) {
        try {
            const likeResponse = await like(id, user.picture.id);
            const renewableLikes = likeResponse.data.renewable_likes;
            console.log(colors.bgGreen, `you liked ${first_name} ${age} ${gender} ${profiles.length} pictures`, colors.reset);
            return renewableLikes || 0;
        } catch (error) {
            console.log(colors.bgRed, `like failed ${error.message}`, colors.reset);
            return 0;
        }

    } else {
        try {
            await dislike(id);
            console.log(colors.bgYellow, `you disliked ${first_name} ${age} ${gender} ${profiles.length} pictures`, colors.reset);
        } catch (error) {
            console.log(colors.bgRed, `dislike failed ${error.message}`, colors.reset);
        }
    }
}

module.exports = handleRecommandation