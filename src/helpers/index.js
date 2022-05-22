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
function checkTraits(traits, userTraits) {
  traits.forEach((trait) => {
    const userHasTrait = userTraits.find(
      (userTrait) => userTrait.short_label_localized[0].value === trait.name
    );
    return (
      !userHasTrait || userHasTrait.answer.single.default_label !== trait.value
    );
  });
}
module.exports = {
  checkAge,
  checkGender,
  checkPictures,
  checkTraits,
};
