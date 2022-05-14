const { auth, recommandations, like, } = require('happn-api',).default;
const dotenv = require('dotenv',);
const helpers = require('./helpers');
const { delay } = require('./utils');

async function login() {
    dotenv.config();
    const { FACEBOOK_EMAIL, FACEBOOK_PASSWORD, } = process.env;
    const facebookCredentials = {
        email: FACEBOOK_EMAIL,
        password: FACEBOOK_PASSWORD,
    };
    return auth.withFacebook(facebookCredentials,);
}

function checkCriterias(user, criterias) {
    const {
        checkAge, checkGender, checkPictures
    } = helpers;
    const {
        age, gender, profiles
    } = user;
    const {
        criteriaMinAge,
        criteriaMaxAge,
        criteriaGender,
        criteriaMinPictures
    } = criterias;
    const ageIsOk = checkAge(criteriaMinAge, criteriaMaxAge, age);
    const genderIsOk = checkGender(criteriaGender, gender);
    const pictureAmountIsOk = checkPictures(criteriaMinPictures, profiles.length);
    return ageIsOk && genderIsOk && pictureAmountIsOk;
}

async function handleRecommandation(user) {
    const {
 id, first_name, age, gender, profiles
} = user;
    const criterias = {
        criteriaMinAge: 34,
        criteriaMaxAge: 40,
        criteriaGender: 'female',
        criteriaMinPictures: 3
    };
    const userHasAllCriterias = checkCriterias(user, criterias);
    let renewableLikes = -1;
    if (userHasAllCriterias && (renewableLikes === -1 || renewableLikes > 2)) {
        await delay(2000);
        try {
            const likeResponse = await like(id, user.picture.id,);
            const { renewable_likes } = likeResponse.data;
            renewableLikes = renewable_likes;
            console.log(`you liked ${first_name} ${age} ${gender} ${profiles.length} pictures`,);
            console.log(`remaining likes : ${renewable_likes}`,);
        } catch (error) {
            console.log(error,);
        }
    } else {
        console.log('no more likes');
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
