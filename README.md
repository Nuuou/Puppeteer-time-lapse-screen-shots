# Takes screen shots of a url at different breakpoint at set intervals of time.
I got my inspiration from https://github.com/typicode/tlapse.
### Inital
---
```
npm install
```

### Startup
---
```
node capture.js
```
 
### Settings
---
Change the url to take a screen shot and set interval time between sreenshots.
Example of prompt when node capture.js is ran.
```
What is the url? https://amvac-chemical-andy.devsr.com/
How often do you want to take screen shots? (1hr) 1m
```
Time format:
```
'2 days' => 2 days
'1d' => 1 day
'10h' => 10 hours
'2.5 hrs' => 2.5 hours
'2h' => 2 hours
'1m' => 1 minute
'5s' => 5 seconds
'1y' => 1 year
```
