## Takes screen shots of a url at different breakpoint at set intervals of time. Create a timelapse of your web development at different breakpoints.
### Inital
---
```
npm install
```
### Setup
---
Create images directory with the following sub folders 1600, 1000, 800, 600.
- images
  - 1600
  - 1000
  - 800
  - 600
### Settings
---
Change the url to scrape and freqency.
```
What is the url? https://amvac-chemical-andy.devsr.com/
How often do you want to take screen shots? (1hr) 1m
```
The time is using https://github.com/zeit/ms
Example time format:
```
ms('2 days')  // 172800000
ms('1d')      // 86400000
ms('10h')     // 36000000
ms('2.5 hrs') // 9000000
ms('2h')      // 7200000
ms('1m')      // 60000
ms('5s')      // 5000
ms('1y')      // 31557600000
ms('100')     // 100
ms('-3 days') // -259200000
ms('-1h')     // -3600000
ms('-200')    // -200
```
