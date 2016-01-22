/// <reference path="../typings/tsd.d.ts" />
import * as fs from 'fs'
import * as marked from 'marked'
import * as chokidar from 'chokidar'
import * as React  from 'react';
import * as ReactDOM  from 'react-dom';

interface Props {}

interface States {
  markdown: string
}

class MarkComponent extends React.Component<Props, States>{
  private watcher: any

  constructor(props: Props) {
    super(props);
    this.watcher = chokidar.watch("./README.md")
    this.state = { markdown: ""}
  }

  componentDidMount() {
    this.watcher.on('add', this.updateMarkDown.bind(this))
    this.watcher.on('change', this.updateMarkDown.bind(this))
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
      <div dangerouslySetInnerHTML={{__html: html}}></div>
    );
  }
}

ReactDOM.render(
  <MarkComponent />,
  document.getElementById('content')
);
