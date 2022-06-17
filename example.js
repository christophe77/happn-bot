const happnBot = require('./src');

const criterias = {
  criteriaMinAge: 34,
  criteriaMaxAge: 41,
  // new feature coming soon : distance
  /*   criteriaDistance: {
    maxDistance: 10,
    myLat: '48.954338',
    myLon: '2.602170',
    unit: 'K',
    // 'K' for kilometers, 'M' for miles
  }, */
  criteriaGender: 'female',
  criteriaMinPictures: 3,
  criteriaTraits: [
    {
      name: 'Exercise',
      values: ['Occasional exercise', 'Enough cardio to keep up'],
    },
    {
      name: 'Smoking',
      values: ['Well, I smoke', 'Not a fan, but whatever'],
    },
    {
      name: 'Kids',
      values: ['I love the ones I have', 'Thanks, but no thanks'],
    },
    {
      name: 'Partying',
      values: ['I’m in bed by midnight', 'I party in moderation'],
    },
  ],
};

// Traits you can use
// eslint-disable-next-line no-unused-vars
const criteriaTraitsList = [
  {
    name: 'Looking for',
    values: ['A relationship', 'Nothing serious', 'I’ll know when I find it'],
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
    values: ['Well, I smoke', 'Not a fan, but whatever', 'Zero tolerance'],
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

// Save pictures of people you like
// Will be downloaded inside /pictures/yyyy-MM-dd/first-name-age/
const savePictures = false;

// Start bot
happnBot.start(savePictures, criterias);
