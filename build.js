/* eslint
  no-console: "off",
  import/no-extraneous-dependencies: ["error", { "devDependencies": true }]
*/

const fs = require('fs');
const path = require('path');

const d3 = require('d3-dsv');
const fetch = require('node-fetch');

const dataUrl = 'https://rawgit.com/rit-public/HappyDB/master/happydb/data/cleaned_hm.csv';
const outputFilename = path.join(__dirname, 'data.json');

const downloadData = async function downloadDataFunc() {
  const res = await fetch(dataUrl);
  console.log('Downloaded data');
  const text = await res.text();
  console.log('Parsed data as string');
  const moments = d3.csvParse(text, (row) => {
    const moment = row.cleaned_hm;
    return moment.replace(/\r/g, '').trim();
  });
  delete moments.columns; // artifact of https://github.com/d3/d3-dsv#dsv_parse
  console.log(`Parsed data as CSV and extracted ${moments.length} happy moments.`);
  fs.writeFileSync(outputFilename, JSON.stringify(moments));
  console.log('Saved to list of moments to disk.');
};

const main = async function mainFunc() {
  try {
    await downloadData();
    console.log('🎉');
  } catch (err) {
    console.error('Failed with this error:');
    console.error(err);
    console.error('😔');
  }
};

main();
