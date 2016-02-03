import * as electron from 'electron'

export function build(mainWin: Electron.BrowserWindow) {
  const template = [{
    label: 'Menu',
    submenu: [
      {
        label: 'Reload',
        click: () => mainWin.reload(),
      },
      {
        label: 'Toggle DevTools',
        click: () => mainWin.webContents.toggleDevTools(),
      },
      {
        label: 'Quit',
        click: () => mainWin.close(),
      }
    ]
  }];

  const menu = electron.Menu.buildFromTemplate(template);
  electron.Menu.setApplicationMenu(menu);

  return menu;
};
