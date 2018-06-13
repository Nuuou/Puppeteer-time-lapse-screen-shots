const fs = require('fs');
const puppeteer = require('puppeteer');
const ms = require('ms');
const inquirer = require('inquirer');

// Default Settings.
let time = '1hr';
let url = 'https://amvac-chemical-andy.devsr.com/';

if (!fs.existsSync('./images')) {
  fs.mkdirSync('./images');
  fs.mkdirSync('./images/600');
  fs.mkdirSync('./images/800');
  fs.mkdirSync('./images/1000');
  fs.mkdirSync('./images/1600');
}

// Create Screen Shots
const captureScreenshots = async () => {
  const viewports = [1600, 1000, 800, 600];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.goto(url);

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
      path: `images/${vw}/screen-${vw}-${Date.now()}.png`,
      fullPage: true,
    });
  }

  await browser.close();
};

async function run() {
  try {
    let data = await askQuestions();
    data = JSON.parse(data);
    [time, url] = data;
    await captureScreenshots();
    setInterval(captureScreenshots, ms(time));
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
      name: 'time',
      message: 'How often do you want to take screen shots?',
      default: time,
    },
  ];

  const data = inquirer.prompt(questions).then(answers => JSON.stringify(answers));
  return data;
}

run();
