import * as React  from 'react';
import * as electron from 'electron'
import {ContentHolderComponent} from './contentHolderComponent';
import * as Thema from '../services/thema'
import * as Watcher from '../services/watcher'
import * as Marked from '../services/marked'
import * as RemoteService from '../services/remoteService'

interface MarkdownComponentStates {
  markdown: string
}

export class MarkdownComponent extends React.Component<{}, MarkdownComponentStates>{
  private watcher: Watcher.Watcher

  constructor() {
    super();
    const currentPath = RemoteService.getArgumentInitPath()
    this.watcher = new Watcher.Watcher(currentPath, this.updateMarkDown.bind(this))
    this.state = { markdown: ""}
  }

  handleFileDrop(path: string) {
    this.watcher.changeWatchPath(path)
  }

  render() {
    let html = Marked.convertMarkedHtml(this.state.markdown)
    return (
      <ContentHolderComponent html={html} onFileDrop={this.handleFileDrop.bind(this)} />
    );
  }

  componentDidMount() {
    Thema.changeThema(RemoteService.getThema())
    this.setOpenLinkWithBrowser()
  }

  componentDidUpdate() {
    this.setOpenLinkWithBrowser()
  }

  updateMarkDown(content: string) {
    this.setState({ markdown: content})
  }

  private setOpenLinkWithBrowser(): void {
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
}
