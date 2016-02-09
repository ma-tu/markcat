import * as electron from 'electron'
import * as config from './config'

export function build(mainWin: Electron.BrowserWindow, cfg: config.Config) {
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
        checked: (cfg.thema == 'thema-normal'),
        click: () => {
          mainWin.webContents.executeJavaScript("changeThema('thema-normal')")
        }
      },
      {
        label: 'Dark',
        id: 'thema-dark',
        type: 'checkbox',
        checked: (cfg.thema == 'thema-dark'),
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
