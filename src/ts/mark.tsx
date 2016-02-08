/// <reference path="../../typings/tsd.d.ts" />
import * as fs from 'fs'
import * as marked from 'marked'
import * as chokidar from 'chokidar'
import * as React  from 'react';
import * as ReactDOM  from 'react-dom';
import {highlight} from 'highlight.js';
import * as config from './config'
import * as electron from 'electron'

const remote = require('remote');

interface Props {}

interface States {
  markdown: string
}

class MarkComponent extends React.Component<Props, States>{
  private watcher: any
  private currentTarget: string

  constructor(props: Props) {
    super(props);

    const argv = remote.process.argv
    const initPage = argv[argv.length-1]
    this.currentTarget = "README.md"
    if ((argv.length == 2) && (initPage.toLowerCase().endsWith("md"))){
      this.currentTarget = initPage
    }
    this.watcher = chokidar.watch(this.currentTarget)
    this.state = { markdown: ""}
  }

  componentDidMount() {
    this.watcher.on('add', this.updateMarkDown.bind(this))
    this.watcher.on('change', this.updateMarkDown.bind(this))
    changeThema(remote.getGlobal('cfg').thema)
    this.setOpenLinkWithBrowser()
  }

  componentDidUpdate() {
    this.setOpenLinkWithBrowser()
  }

  setOpenLinkWithBrowser() {
    const anchors = document.querySelectorAll('a')
    for(let i = 0; i < anchors.length; i++) {
      let anker = anchors.item(i) as HTMLLinkElement
      anker.onclick = (e) => {
        event.preventDefault()

        let target = event.target as HTMLLinkElement
        electron.shell.openExternal(target.href)
      }
    }
  }

  handleFileDrop(path: string) {
    this.changeWatchTarget(path)
  }

  changeWatchTarget(path: string) {
    this.watcher.unwatch(this.currentTarget)
    this.watcher.add(path)
    this.currentTarget = path
  }

  updateMarkDown(path: string, stats: any) {
    fs.readFile(path, 'utf8', (err: any, content: any) => {
      if (err) throw err
      this.setState({ markdown: content})
    });
  }

  render() {
    marked.setOptions({
      highlight: function (code: string, lang: string): string {
        if (lang === undefined) {
            return code;
        }

        return highlight(lang, code).value;
      }
    })

    let html = marked(this.state.markdown)
    return (
      <Holder html={html} onFileDrop={this.handleFileDrop.bind(this)} />
    );
  }
}

interface HolderProps {
  html: string,
  onFileDrop: any
}

interface HolderStates {
  markdown: string
}

class Holder extends React.Component<HolderProps, HolderStates>{
  handleDragOver(e: any) {
    e.preventDefault()
  }

  handleDrop(e: any) {
    e.preventDefault()
    let file = e.dataTransfer.files[0]
    this.props.onFileDrop(file.path)
  }

  render() {
    return (
      <div id="holder" onDragOver={this.handleDragOver.bind(this)} onDrop={this.handleDrop.bind(this)}>
        <div id="mark-content" dangerouslySetInnerHTML={{__html: this.props.html}} />
      </div>
    )
  }
}


ReactDOM.render(
  <MarkComponent />,
  document.getElementById('content')
);

function changeThema(themaId: string) {
  var cfg: config.Config = remote.getGlobal('cfg')
  cfg.thema = themaId
  remote.require('./ts/config').writeConfig(remote.process.execPath, cfg)

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
