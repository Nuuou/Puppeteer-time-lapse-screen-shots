const fs = require('fs');
const puppeteer = require('puppeteer');
const ms = require('ms');
const inquirer = require('inquirer');
const moment = require('moment');

// Default Settings.
let frequency = 'now';
let url = 'http://amvac-chemical-screenshot.devsr.com';
const viewports = [1600, 1000, 800, 600];
const dateNow = moment().format('YYYY-MM-DD--HH-mm-ss');

// Make default date directory.
if (!fs.existsSync('./images')) {
  fs.mkdirSync('./images');
}

fs.mkdirSync(`./images/${dateNow}`);

// Create Screen Shots
const captureScreenshots = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.goto(url);

  // Make new date directory.
  const dateNowUpdated = moment().format('YYYY-MM-DD--HH-mm-ss');
  if (!fs.existsSync(`./images/${dateNowUpdated}`)) {
    fs.mkdirSync(`./images/${dateNowUpdated}`);
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
    await page.screenshot({
      path: `images/${dateNow}/${vw}--fullscreen.png`,
      fullPage: true,
    });
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
