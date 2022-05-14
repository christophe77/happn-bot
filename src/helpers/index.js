function checkAge(minAge, maxAge, userAge) {
    return minAge <= userAge <= maxAge;
}
function checkGender(gender, userGender) {
    return gender === userGender;
}
function checkPictures(minPictures, userPicturesAmount) {
    return userPicturesAmount >= minPictures;
}
module.exports = {
    checkAge, checkGender, checkPictures
};
