const getDistance = require('../utils/getDistance');

function checkAge(minAge, maxAge, userAge) {
  const minAgeIsOk = userAge >= minAge;
  const maxAgeIsOk = userAge <= maxAge;
  return minAgeIsOk && maxAgeIsOk;
}
function checkDistance(criteriaDistance, position) {
  if (!criteriaDistance) {
    return true;
  }
  if (!position) {
    return false;
  }
  const { maxDistance, myLat, myLon, unit } = criteriaDistance;
  const { lat, lon } = position;
  const partnerDistance = getDistance(myLat, myLon, lat, lon, unit);
  return partnerDistance <= maxDistance;
}
function checkGender(gender, userGender) {
  if (!gender) {
    return true;
  }
  if (!userGender) {
    return false;
  }
  return gender === userGender;
}
function checkPictures(minPictures, userPicturesAmount) {
  if (!minPictures) {
    return true;
  }
  if (!userPicturesAmount) {
    return false;
  }
  return userPicturesAmount >= minPictures;
}
function checkTraits(criteriaTraits, partnerTraits) {
  if (!criteriaTraits) {
    return true;
  }
  if (!partnerTraits) {
    return false;
  }
  let commonTraitLength = 0;
  criteriaTraits.forEach((trait) => {
    const userHasFilledTrait =
      partnerTraits.findIndex(
        (partnerTrait) => partnerTrait.default_short_label === trait.name
      ) !== -1;
    if (userHasFilledTrait) {
      const partnerTraitAnswer = partnerTraits.find(
        (partnerTrait) => partnerTrait.default_short_label === trait.name
      ).answer.single.default_label;
      if (trait.values.includes(partnerTraitAnswer)) {
        commonTraitLength += 1;
      }
    }
  });
  return commonTraitLength === criteriaTraits.length;
}
module.exports = {
  checkAge,
  checkDistance,
  checkGender,
  checkPictures,
  checkTraits,
};
