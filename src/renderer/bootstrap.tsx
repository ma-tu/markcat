import * as React  from 'react';
import * as ReactDOM  from 'react-dom';
import {MarkdownComponent} from './components/markdownComponent';
import * as Thema from './services/thema';

ReactDOM.render(
  <MarkdownComponent />,
  document.getElementById('app')
);

function changeThema(themaId: string) {
  return Thema.changeThema(themaId)
}
