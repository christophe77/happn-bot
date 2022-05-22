function checkAge(minAge, maxAge, userAge) {
  const minAgeIsOk = userAge >= minAge;
  const maxAgeIsOk = userAge <= maxAge;
  return minAgeIsOk && maxAgeIsOk;
}
function checkGender(gender, userGender) {
  return gender === userGender;
}
function checkPictures(minPictures, userPicturesAmount) {
  return userPicturesAmount >= minPictures;
}
function checkTraits(myTraits, partnerTraits) {
  let hasTraits = false;
  myTraits.forEach((trait) => {
    const userHasTrait = partnerTraits.find((partnerTrait) => {
      const traitIndex = partnerTrait.short_label_localized.findIndex(
        (traitName) => traitName.value === trait.name
      );
      return traitIndex !== -1;
    });
    if (
      userHasTrait &&
      userHasTrait.answer.single.default_label === trait.value
    ) {
      hasTraits = true;
    }
  });
  return hasTraits;
}
module.exports = {
  checkAge,
  checkGender,
  checkPictures,
  checkTraits,
};
