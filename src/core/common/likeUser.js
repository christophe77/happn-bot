const { like } = require('happn-api').default;
const colors = require('../../utils/colors');

async function likeUser(user) {
  const { id, first_name, age, gender, profiles } = user;
  const likeResponse = await like(id, user.picture.id);
  const renewableLikes = likeResponse.data.renewable_likes;
  console.log(
    colors.bgGreen,
    `you liked ${first_name} ${age} ${gender} ${profiles.length} pictures`,
    colors.reset
  );
  return renewableLikes || 0;
}

module.exports = likeUser;
