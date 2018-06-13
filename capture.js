const fs = require('fs');
const puppeteer = require('puppeteer');
const ms = require('ms');
const inquirer = require('inquirer');
const moment = require('moment');

// Default Settings.
let frequency = 'now';
let url = 'http://amvac-chemical-screenshot.devsr.com';
const viewports = [1600, 1000, 800, 600];
let dateNow = moment().format('YYYY-MM-DD--HH-mm-ss');

// Make default date directory.
if (!fs.existsSync('./images')) {
  fs.mkdirSync('./images');
}

// Create Screen Shots
const captureScreenshots = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.goto(url);

  // Make new date directory.
  dateNow = moment().format('YYYY-MM-DD--HH-mm-ss');
  if (!fs.existsSync(`./images/${dateNow}`)) {
    fs.mkdirSync(`./images/${dateNow}`);
  }

  for (let i = 0; i < viewports.length; i++) {
    const vw = viewports[i];

    // The height doesn't matter since we are screenshotting the full page.
    /* eslint-disable-next-line no-await-in-loop */
    await page.setViewport({
      width: vw,
      height: 900,
    });

    /* eslint-disable-next-line no-await-in-loop */
    const bodyHandle = await page.$('body');

    /* eslint-disable-next-line no-await-in-loop */
    const { width, height } = await bodyHandle.boundingBox();

    /* Replace fullPage implementation with custom selector based on body: https://github.com/GoogleChrome/puppeteer/issues/703#issuecomment-366041479 */
    /* eslint-disable-next-line no-await-in-loop */
    await page.screenshot({
      path: `images/${dateNow}/${vw}--fullscreen.png`,
      clip: {
        x: 0,
        y: 0,
        width,
        height,
      },
    });

    /* eslint-disable-next-line no-await-in-loop */
    await bodyHandle.dispose();
  }

  await browser.close();
};

async function run() {
  try {
    const data = await askQuestions();
    ({ frequency, url } = data);
    await captureScreenshots();
    if (frequency !== 'now') {
      setInterval(captureScreenshots, ms(frequency));
    }
  } catch (e) {
    // TODO: Better error handling.
    console.log(e);
  }
}

// CMD prompt question
function askQuestions() {
  const questions = [
    {
      type: 'input',
      name: 'url',
      message: 'What is the url?',
      default: url,
    },
    {
      type: 'input',
      name: 'frequency',
      message: 'How often do you want to take screen shots? Use "now" for single screenshot.',
      default: frequency,
    },
  ];

  const data = inquirer.prompt(questions).then(answers => answers);
  return data;
}

run();
