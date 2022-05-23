# HAPPN BOT - NODEJS

Bot for happn dating app including facebook login, like and dislike, with or without criterias.
I'm using happn-api package from [https://www.npmjs.com/package/happn-api](https://www.npmjs.com/package/happn-api).

## INSTALL

    yarn add happn-bot
    // or
    npm install happn-bot

## CONFIG

Create a .env file at the root of the project.
Add your facebook account details in it :

    FACEBOOK_EMAIL=email@gmail.com
    FACEBOOK_PASSWORD=YoUrPaSsWoRd

## EXAMPLE

    const happnBot = require('happn-bot');
    // or
    import happnBot from 'happnBot';

    const criterias = {
        criteriaMinAge: 34,
        criteriaMaxAge: 40,
        criteriaGender: 'female',
        criteriaMinPictures: 3,
        criteriaTraits: [
            { name: 'Smoking', value: 'Not a fan, but whatever' },
            { name: 'Kids', value: 'I love the ones I have' },
            { name: 'Partying', value: 'I’m in bed by midnight' },
        ],
    };
    // Save pictures of people you like
    // Will be downloaded inside /pictures/yyyy-MM-dd/first-name-age/
    const savePictures = true;

    // Start bot
    happnBot.start(savePictures, criterias);

### CRITERIAS

    const criteriaTraitsList = [
        {
            name: 'Looking for',
            values: [
                'A relationship',
                'Nothing serious',
                'I’ll know when I find it'
            ],
        },
        {
            name: 'Exercise',
            values: [
                'Occasional exercise',
                'Enough cardio to keep up',
                'All exercise all the time',
            ],
        },
        {
            name: 'Cooking',
            values: [
                'I’m a microwave master',
                'I’m a delivery expert',
                'I know a few good recipes',
                'I’m an excellent chef',
            ],
        },
        {
            name: 'Travel',
            values: [
                'Hiking & backpack',
                'Deckchair & sunscreen',
                'Museum & postcards',
            ],
        },
        {
            name: 'Partying',
            values: [
                'I’m in bed by midnight',
                'I party in moderation',
                'I’m a night owl',
            ],
        },
        {
            name: 'Smoking',
            values: [
                'Well, I smoke',
                'Not a fan, but whatever',
                'Zero tolerance'
            ],
        },
        {
            name: 'Kids',
            values: [
                'I love the ones I have',
                'I have some, but want more',
                'I’d like some, thanks',
                'Thanks, but no thanks',
            ],
        },
    ];

### INFORMATIONS

I'm still working on this project, on the criteria's part to make it easyier to fill.
