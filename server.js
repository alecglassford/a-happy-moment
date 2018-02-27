/* eslint-disable no-console */

const moments = require('./data.json');

console.log('Loaded data');

module.exports = function serveRandomLine() {
  const index = Math.floor(Math.random() * moments.length);
  return moments[index];
};
