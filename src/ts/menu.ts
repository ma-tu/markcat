import * as electron from 'electron'

export function build(mainWin: Electron.BrowserWindow) {
  const template = [{
    label: 'Menu',
    id: 'menu',
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
        type: 'separator'
      },
      {
        label: 'Quit',
        click: () => mainWin.close(),
      }
    ]
  },
  {
    label: 'Thema',
    id: 'thema',
    submenu: [
      {
        label: 'Normal',
        id: 'thema-normal',
        type: 'checkbox',
        checked: true,
        click: () => {
          mainWin.webContents.executeJavaScript("changeThema('thema-normal')")
        }
      },
      {
        label: 'Dark',
        id: 'thema-dark',
        type: 'checkbox',
        checked: false,
        click: () => {
          mainWin.webContents.executeJavaScript("changeThema('thema-dark')")
        }
      }
    ]
  }];

  const menu = electron.Menu.buildFromTemplate(template);
  electron.Menu.setApplicationMenu(menu);

  return menu;
};
