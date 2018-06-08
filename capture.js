const puppeteer = require('puppeteer');
const ms = require('ms');
const inquirer = require('inquirer');

// Default Settings.
let time = '1hr';
let url = 'https://amvac-chemical-andy.devsr.com/';

function askQuestions() {
  const questions = [
    {
      type: 'input',
      name: 'url',
      message: 'What is the url?',
      default: function () {
        return url;
      }
    },
    {
      type: 'input',
      name: 'time',
      message: 'How often do you want to take screen shots?',
      default: function () {
        return time;
      }
    }
  ]

  let data = inquirer.prompt(questions).then(answers => {
    return JSON.stringify(answers);
  });
  return data;
}

async function run() {
  try {
    let data = await askQuestions();
    data = JSON.parse(data);
    time = data.time;
    url = data.url;
    await captureScreenshots();
    setInterval(captureScreenshots, ms(time));
  } catch (e) {
    console.log(e);
  }
}

const captureScreenshots = async () => {
  let viewports = [1600, 1000, 800, 600];
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.goto(url);

  for (let i = 0; i < viewports.length; i++) {
    let vw = viewports[i];

    // The height doesn't matter since we are screenshotting the full page.
    await page.setViewport({
      width: vw,
      height: 1000
    });

    await page.screenshot({
      path: `images/${vw}/screen-${vw}-${Date.now()}.png`,
      fullPage: true
    });
  }

  await browser.close()
}
run();