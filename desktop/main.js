'use strict';
// Varken Sketchpad as a Windows program: the same page, in its own window, with everything inside the installer
// (nothing is loaded from the web except the optional AI cut-out model and your uploads to GitHub).
const { app, BrowserWindow, Menu, protocol, net, shell, session, dialog } = require('electron');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.join(__dirname, '..');
// The page asks the browser to fetch files (the pet drawing in game/source.html), which a file:// page may not do,
// so the files are served under their own address, sketch://app/.
protocol.registerSchemesAsPrivileged([{ scheme: 'sketch', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true } }]);

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1360, height: 860, minWidth: 760, minHeight: 520,
    backgroundColor: '#1b1522', title: 'Varken Sketchpad', autoHideMenuBar: true,
    icon: path.join(ROOT, 'build', 'icon.png'),
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  win.loadURL('sketch://app/index.html?owner=1');   // this is her own copy: the upload buttons are on
  // links in the page (GitHub, help) open in the normal browser, not in this window
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('sketch://')) { e.preventDefault(); if (/^https?:/.test(url)) shell.openExternal(url); } });
  win.on('closed', () => { win = null; });
}

function start() {
  app.whenReady().then(() => {
    Menu.setApplicationMenu(null);   // the page has its own File and Edit menus
    protocol.handle('sketch', (req) => {
      const rel = decodeURIComponent(new URL(req.url).pathname).replace(/^\/+/, '') || 'index.html';
      const file = path.normalize(path.join(ROOT, rel));
      if (!file.startsWith(ROOT + path.sep)) return new Response('Not found', { status: 404 });   // nothing outside the app's own folder
      return net.fetch(pathToFileURL(file).toString());
    });
    // copying a picture to the clipboard is asked for by the page itself
    session.defaultSession.setPermissionRequestHandler((wc, permission, cb) => cb(['clipboard-sanitized-write', 'clipboard-read', 'fullscreen'].includes(permission)));
    createWindow();
    app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow(); });
    checkForUpdates();
  });
  app.on('window-all-closed', () => app.quit());
}

/** Installed copies look for a newer release on GitHub and download it quietly; when it is ready they ask whether to restart now. */
function checkForUpdates() {
  if (!app.isPackaged) return;
  try {
    const { autoUpdater } = require('electron-updater');
    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = true;   // "Later" still installs it the next time the program is closed
    autoUpdater.on('error', () => { /* offline or no release yet: try again next time */ });
    let asked = '';
    autoUpdater.on('update-downloaded', (info) => {
      if (asked === info.version) return;   // one question per version
      asked = info.version;
      const options = { type: 'question', buttons: ['Restart now', 'Later'], defaultId: 0, cancelId: 1, title: 'Varken Sketchpad',
        message: 'A new version (' + info.version + ') is ready.', detail: 'Restart to use it. Save your work first if you have not: your drawing is kept, but anything in a menu or box will close.' };
      (win ? dialog.showMessageBox(win, options) : dialog.showMessageBox(options)).then((r) => { if (r.response === 0) autoUpdater.quitAndInstall(); }).catch(() => {});
    });
    autoUpdater.checkForUpdates().catch(() => {});
    setInterval(() => autoUpdater.checkForUpdates().catch(() => {}), 6 * 3600 * 1000);
  } catch (e) { /* the updater is not there: nothing to do */ }
}

if (!app.requestSingleInstanceLock()) { app.quit(); }
else {
  app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
  start();
}
