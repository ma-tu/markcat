/// <reference path="../typings/tsd.d.ts" />
import * as React  from 'react';
import * as ReactDOM  from 'react-dom';

interface Props {
  name: string;
}

class Test extends React.Component<Props, {}>{
  render() {
    return (
      <div>Hi {this.props.name}</div>
    );
  }
}

ReactDOM.render(
  <Test name="Sample" />,
  document.getElementById('content')
);
