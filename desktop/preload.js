'use strict';
// What the page may ask the program (the About tab): its version and whether a newer one is out.
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('varkenDesktop', {
  info: () => ipcRenderer.invoke('about:info'),
  checkForUpdates: () => ipcRenderer.invoke('about:check')
});
