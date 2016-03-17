import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Board } from './containers';
import './styles/app.scss';

class App extends Component {
  render() {
    return <Board />;
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
