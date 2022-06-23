const dotenv = require('dotenv');
const { auth } = require('happn-api').default;

async function login() {
  dotenv.config();
  const { FACEBOOK_EMAIL, FACEBOOK_PASSWORD } = process.env;
  const facebookCredentials = {
    email: FACEBOOK_EMAIL,
    password: FACEBOOK_PASSWORD,
  };
  return auth.withFacebook(facebookCredentials);
}

module.exports = login;
