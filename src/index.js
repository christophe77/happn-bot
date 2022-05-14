const happnApi = require('happn-api').default
const dotenv = require('dotenv')

const { auth, recommandations, like } = happnApi

async function login() {
    dotenv.config()
    const { FACEBOOK_EMAIL, FACEBOOK_PASSWORD } = process.env
    const facebookCredentials = {
        email: FACEBOOK_EMAIL,
        password: FACEBOOK_PASSWORD,
    }
    return auth.withFacebook(facebookCredentials)
}

async function getRecommandations() {
    const loginSuccess = await login()
    console.log(loginSuccess)
    if (loginSuccess) {
        const myRecommandations = await recommandations();
        console.log(JSON.stringify(myRecommandations.data[0].content.user))
        return myRecommandations.data || []
    }
    return []
}

async function likeOne() {
    const myRecs = await getRecommandations()
    if (myRecs.length > 0) {
        const userToLike = myRecs[0].content.user;
        const {first_name, age} = userToLike;
        try {
            const likeResponse = await like(
                userToLike.id,
                userToLike.picture.id,
            )
            const { renewable_likes, has_liked_me, has_crushed } =
                likeResponse.data
            console.log(`you liked ${first_name} ${age}`)
            console.log(`remaining likes : ${renewable_likes}`)
            if (has_liked_me) {
                console.log('she liked you')
            }
            if (has_crushed) {
                console.log('we have a crush')
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        return
    }
}

getRecommandations()
