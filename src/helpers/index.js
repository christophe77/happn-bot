function checkAge(minAge, maxAge, userAge) {
  return minAge <= userAge <= maxAge;
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
    if (
      !userHasTrait
      || userHasTrait.answer.single.default_label !== trait.value
    ) {
      return false;
    }
  });
  return true;
}
module.exports = {
  checkAge,
  checkGender,
  checkPictures,
  checkTraits,
};
