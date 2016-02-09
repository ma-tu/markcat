import * as config from '../../services/config'
const remote = require('remote');

export function changeThema(themaId: string) {
  var cfg: config.Config = remote.getGlobal('cfg')
  cfg.thema = themaId
  remote.require('./services/config').writeConfig(remote.process.execPath, cfg)

  switch(themaId) {
    case 'thema-normal':
      changeThemaMenu(themaId)
      changeCssThemaFile('./css/thema-normal.css')
      break
    case 'thema-dark':
      changeThemaMenu(themaId)
      changeCssThemaFile('./css/thema-dark.css')
      break
  }
}

function changeThemaMenu(themaId: string) {
  const themaThemaMenu = remote.app.getApplicationMenu().items.find((item: Electron.MenuItemOptions) => item.id == 'thema')
  const themaNormalItem = themaThemaMenu.submenu.items.find((item: Electron.MenuItemOptions) => item.id == 'thema-normal')
  const themaDarkItem = themaThemaMenu.submenu.items.find((item: Electron.MenuItemOptions) => item.id == 'thema-dark')

  switch(themaId) {
    case 'thema-normal':
      themaNormalItem.checked = true
      themaDarkItem.checked = false
      break
    case 'thema-dark':
      themaNormalItem.checked = false
      themaDarkItem.checked = true
      break
  }
}

function changeCssThemaFile(cssFilePath: string) {
  var linkEl: HTMLLinkElement = document.getElementById('css-thema') as HTMLLinkElement
  linkEl.href = cssFilePath;
}
