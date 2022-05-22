const helpers = require('../helpers');

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

module.exports = checkCriterias;
