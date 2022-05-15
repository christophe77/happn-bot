const { auth, recommandations, like } = require('happn-api').default;
const dotenv = require('dotenv');
const helpers = require('./helpers');
const { delay } = require('./utils');

async function login() {
  dotenv.config();
  const { FACEBOOK_EMAIL, FACEBOOK_PASSWORD } = process.env;
  const facebookCredentials = {
    email: FACEBOOK_EMAIL,
    password: FACEBOOK_PASSWORD,
  };
  return auth.withFacebook(facebookCredentials);
}

function checkCriterias(user, criterias) {
  const { checkAge, checkGender, checkPictures, checkTraits } = helpers;
  const { age, gender, profiles, traits } = user;
  const {
    criteriaMinAge,
    criteriaMaxAge,
    criteriaGender,
    criteriaMinPictures,
    criteriaTraits,
  } = criterias;
  const ageIsOk = checkAge(criteriaMinAge, criteriaMaxAge, age);
  const genderIsOk = checkGender(criteriaGender, gender);
  const pictureAmountIsOk = checkPictures(criteriaMinPictures, profiles.length);
  const traitsAreOk = checkTraits(criteriaTraits, traits);
  return ageIsOk && genderIsOk && pictureAmountIsOk && traitsAreOk;
}

async function handleRecommandation(user) {
  const { id, first_name, age, gender, profiles } = user;
  const criterias = {
    criteriaMinAge: 34,
    criteriaMaxAge: 40,
    criteriaGender: 'female',
    criteriaMinPictures: 3,
    criteriaTraits: [
      { name: 'Smoking', value: 'Not a fan, but whatever' },
      { name: 'Kids', value: 'I love the ones I have' },
    ],
  };
  const userHasAllCriterias = checkCriterias(user, criterias);
  console.log(userHasAllCriterias, first_name)
  let renewableLikes = -1;
  if (userHasAllCriterias) {
    try {
      await delay(2000);
      console.log(id, user.picture.id)
      const likeResponse = await like(id, user.picture.id);
      const { renewable_likes } = likeResponse.data;
      renewableLikes = renewable_likes;
      console.log(
        `you liked ${first_name} ${age} ${gender} ${profiles.length} pictures`,
      );
      console.log(`remaining likes : ${renewable_likes}`);
    } catch (error) {
      console.log(error);
    }
  }
}

async function startBot() {
  const loginSuccess = await login();
  if (loginSuccess) {
    const myRecommandations = await recommandations();
    myRecommandations.data.forEach(async (recommandation) => {
      try {
        await handleRecommandation(recommandation.content.user);
      } catch (error) {
        console.log(error);
      }
    });
  }
}
startBot();
