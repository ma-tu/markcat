/// <reference path="../typings/tsd.d.ts" />
import * as fs from 'fs'
import * as marked from 'marked'
import * as chokidar from 'chokidar'
import * as React  from 'react';
import * as ReactDOM  from 'react-dom';

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
    this.currentTarget = ""
    if (argv.length == 2){
      this.currentTarget = initPage
    }
    this.watcher = chokidar.watch(this.currentTarget)
    this.state = { markdown: ""}
  }

  componentDidMount() {
    this.watcher.on('add', this.updateMarkDown.bind(this))
    this.watcher.on('change', this.updateMarkDown.bind(this))
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
    let html = marked(this.state.markdown)
    return (
      <div>
        <Holder onFileDrop={this.handleFileDrop.bind(this)} />
        <div dangerouslySetInnerHTML={{__html: html}}></div>
      </div>
    );
  }
}

interface HolderProps {
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
    let style = {
      position: 'absolute',
      width: window.innerWidth,
      height: window.innerHeight
    }
    return (
      <div id="holder" style={style} onDragOver={this.handleDragOver.bind(this)} onDrop={this.handleDrop.bind(this)}></div>
    )
  }
}


ReactDOM.render(
  <MarkComponent />,
  document.getElementById('content')
);
