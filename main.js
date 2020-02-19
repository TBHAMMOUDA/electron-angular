const { app, BrowserWindow, ipcMain} = require('electron')
const path = require("path");

let mainWindow
const startUrl = process.env.ELECTRON_START_URL || `file://${__dirname}/dist/index.html`;

  function createWindow () {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    })
  
 //   mainWindow.setFullScreen(true);
 //   mainWindow.setMenu(null);
  
    mainWindow.loadURL(startUrl);


  
    mainWindow.on('closed', function () {
      mainWindow = null
    })
    
  }
  app.on('ready', createWindow)


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

function openModal(){
  const { BrowserWindow } = require('electron');
  let modal = new BrowserWindow({ parent: mainWindow, modal: true, show: false })
  modal.loadURL('https://www.sitepoint.com')
  modal.once('ready-to-show', () => {
    modal.show()
  })
}

ipcMain.on('openModal', (event, arg) => {
  openModal()
})