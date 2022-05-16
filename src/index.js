const colors = require('./utils/colors');
const { login, processRecommandations }  = require('./core');

async function startBot(criterias) {
    const loginSuccess = await login();
    if (loginSuccess) {
        await processRecommandations(criterias);
    } else {
        console.log(colors.bgRed, "login failed", colors.reset);
    }
}

const criterias = {
    criteriaMinAge: 34,
    criteriaMaxAge: 40,
    criteriaGender: 'female',
    criteriaMinPictures: 3,
    criteriaTraits: [
        { name: 'Smoking', value: 'Not a fan, but whatever' },
        { name: 'Kids', value: 'I love the ones I have' },
        { name: 'Partying', value: 'I’m in bed by midnight' },
    ],
};
startBot(criterias);
