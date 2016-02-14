'use strict';

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

const config = require('./services/config')
const menu = require('./services/menu');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q

  //When it was closed, markcat will be closed
  //if (process.platform != 'darwin') {
    app.quit();
  //}
});

// for mac
// filePath from "open this application"
var openFilePath = null;
var openFileHandler = function(event, path) {
  event.preventDefault();
  openFilePath = path;
};
app.on('open-file', openFileHandler);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/renderer/index.html');

  <!-- build:remove-->
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  <!-- endbuild -->

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // for mac
  // filePath from "open this application"
  app.removeListener('open-file', openFileHandler);
  global.openFilePath = openFilePath;

  var cfg = config.readConfig(process.execPath)
  global.cfg = cfg
  menu.build(mainWindow, cfg);
});
