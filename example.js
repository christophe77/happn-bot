const happnBot = require('./src');

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
const savePictures = true;

// Start bot
happnBot.start(savePictures, criterias);
