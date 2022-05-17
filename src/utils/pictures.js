const path = require("path");
const axios = require('axios');
const fs = require('fs');
const { promisify } = require('util');
const mkdir = promisify(fs.mkdir);

const today = new Date().toISOString().split('T')[0];
const todayPath = path.join(process.cwd(), "pictures", today);

async function checkPicturePath(pathName) {

    if (!fs.existsSync(pathName)) {
        await mkdir(pathName, { recursive: true });
    }
}

function downloadImage(url, imagePath) {
    axios({
        url,
        responseType: 'stream',
    }).then(
        response =>
            new Promise((resolve, reject) => {
                response.data
                    .pipe(fs.createWriteStream(imagePath))
                    .on('finish', () => resolve())
                    .on('error', e => reject(e));
            }),
    );
}

async function saveUserPictures(user) {
    const { first_name, age, profiles } = user;
    const pathName = `${first_name}-${age}`;
    const savePicturesRootPath = path.join(todayPath, pathName);

    await checkPicturePath(savePicturesRootPath);
    if (profiles.length > 0) {
        profiles.forEach(async (profile, index) => {
            const imagePath = path.join(savePicturesRootPath, index +1, '.jpg')
            await downloadImage(profile.url, imagePath)
        });
    }
}
module.exports = saveUserPictures