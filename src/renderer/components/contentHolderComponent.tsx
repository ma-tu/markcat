import * as React  from 'react';

interface ContentHolderComponentProps {
  html: string,
  onFileDrop: any
}

export class ContentHolderComponent extends React.Component<ContentHolderComponentProps, {}>{
  handleDragOver(e: any) {
    e.preventDefault()
  }

  handleDrop(e: any) {
    e.preventDefault()

    const file = e.dataTransfer.files[0]
    this.props.onFileDrop(file.path)
  }

  render() {
    return (
      <div id="holder" onDragOver={this.handleDragOver.bind(this)} onDrop={this.handleDrop.bind(this)}>
        <div id="content" dangerouslySetInnerHTML={{__html: this.props.html}} />
      </div>
    )
  }
}
