# git-timeline by angeeeeelh

** Proof of concept of a tool for developers to improve github documentation using screenshots and text (source code included) **

![Image of from git-timeline](https://github.com/angeeeeelh/git-timeline/blob/master/images/Mon%20Aug%2007%202017%2014-10-03%20GMT-0700%20(PDT).png)

This application makes use of the availbale API modules such as desktopcapture, navigator, dialog modules and does not depend on 3rd party APIs. Support has been provided for using legacy calls when the future standard chromium API calls related to getUsermedia and webkitgetusermedia. 

## Modules and features used from electron
Module | features
------------ | -------------
navigator | getUsermedia/webkitgetusermedia
desktopcapture | getsources
global shortcut | tba
browserwindow | loadURL
dialog | (no longer used in final version) 
webContents | tba
session | features are in progress, and not integrated currently
nativeImage | toPNG, createFromDataURL
ipcMain | on channel listener
ipcRenderer | on channel listener


## Modules and features used from chromium

Module | features
------------ | -------------
tba | tba


## Modules and features used from other 3rd party js packages

Module | features
------------ | -------------
fs | writefilesync 
request | no longer used 


## Key functions
Basic functions
- [x] Add CtrlorCommand+Shift+Plus as global shortcut that is recognized no matter which active state
- [x] Create handle for stream of media containing everything on screen that is viewable to user
- [x] Provide support for up-to-date chromium API and legacy functions
- [x] Save picture of screenshot using button
- [x] Allow for title of First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column
image to automatically set to the date and time

advanced functions
- [x] Use shortcut to complete all steps for taking picture and saving in a default location. 
- [ ] read Github branch and commit info 
- [ ] Create visual representation
- [ ] Perform testing of API
- [ ] Attach session data 


## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/angeeeeelh/git-timeline
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Run the app
npm start
```

OR

use the distributed packaged application (to be included soon 8/7/2017)


## License

[MIT License](LICENSE.md)
