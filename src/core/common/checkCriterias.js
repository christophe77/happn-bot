const helpers = require('../../helpers');

function checkCriterias(user, criterias) {
  const {
    checkAge,
    // checkDistance,
    checkGender,
    checkPictures,
    checkTraits,
  } = helpers;
  const {
    age,
    // position,
    gender,
    profiles,
    traits,
  } = user;
  const {
    criteriaMinAge,
    criteriaMaxAge,
    // criteriaDistance,
    criteriaGender,
    criteriaMinPictures,
    criteriaTraits,
  } = criterias;
  const ageIsOk = checkAge(criteriaMinAge, criteriaMaxAge, age);
  // const distanceIsOk = checkDistance(criteriaDistance, position);
  const genderIsOk = checkGender(criteriaGender, gender);
  const pictureAmountIsOk = checkPictures(criteriaMinPictures, profiles.length);
  const traitsAreOk = checkTraits(criteriaTraits, traits);
  return (
    ageIsOk &&
    // && distanceIsOk
    genderIsOk &&
    pictureAmountIsOk &&
    traitsAreOk
  );
}

module.exports = checkCriterias;
