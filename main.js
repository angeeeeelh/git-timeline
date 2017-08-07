const electron = require('electron')
// Module to control application life.
const app = electron.app

const globalShortcut = electron.globalShortcut
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')


//CommandorControl is used since the mac equivalent of control on a keyboard is command. See documentation under platform notice
// PrintScreen is what is listed under available key codes
const fixedshortcut = 'CmdOrCtrl+Shift+Plus'




// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, darkTheme: true, title: 'Electron'})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
   mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function removeGlobalShortcut(){
   if (globalShortcut.isRegistered(fixedshortcut) == true) 
    {globalShortcut.unregister(fixedshortcut)
      console.log("shortcut is unregistered now")
    }
}

function addGlobalShortcut () {
  // check if shortcut registered for control shift print
  // later on we'll allow for prompting of desired command
  
  if (globalShortcut.isRegistered(fixedshortcut))
  {
     console.log("The command " + fixedshortcut + "is unavailable.")
  }
  else
  { //callback function is called when button is pressed
    console.log("add global shortcut")
    globalShortcut.register(fixedshortcut, () => {
      console.log("print shortcut was pressed!!!")
    })
  }
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

// app registers global shortcut for print screen only once when app is ready. not on each createwindow
// not sure how to call multiple functions
app.on('ready', //createWindow
function (){ createWindow ()
  removeGlobalShortcut()
  addGlobalShortcut()
 }
  )

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('will-quit', () => {
  // Unregister printscreen shortcut.
  removeGlobalShortcut()
  })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
