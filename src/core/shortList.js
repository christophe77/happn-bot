const { shortList } = require('happn-api').default;

async function getShortList() {
  return shortList();
}

module.exports = getShortList;
